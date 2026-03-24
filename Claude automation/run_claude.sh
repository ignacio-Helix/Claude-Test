#!/usr/bin/env bash
set -euo pipefail

LOCKFILE="/opt/claude-automation/.lock"

# Exit if already running
if [ -f "$LOCKFILE" ]; then
  echo "[$(date)] Skipped: already running (lock exists)" >> /opt/claude-automation/logs/run.log
  exit 0
fi

# Create lock file, remove on exit (success or failure)
trap 'rm -f "$LOCKFILE"' EXIT
echo $$ > "$LOCKFILE"

source /opt/claude-automation/.env
export ANTHROPIC_API_KEY

JIRA_AUTH="${JIRA_EMAIL}:${JIRA_API_TOKEN}"

# Transition a Jira issue by status name
# Usage: jira_transition <issue_key> <target_status_name>
jira_transition() {
  local ISSUE_KEY=$1
  local TARGET_STATUS=$2
  local TRANSITION_ID
  TRANSITION_ID=$(curl -s -u "${JIRA_AUTH}" \
    "${JIRA_BASE_URL}/rest/api/3/issue/${ISSUE_KEY}/transitions" \
    | jq -r --arg name "$TARGET_STATUS" \
    '.transitions[] | select(.name == $name) | .id')
  if [ -n "$TRANSITION_ID" ]; then
    curl -s -u "${JIRA_AUTH}" -X POST \
      -H "Content-Type: application/json" \
      -d "{\"transition\": {\"id\": \"${TRANSITION_ID}\"}}" \
      "${JIRA_BASE_URL}/rest/api/3/issue/${ISSUE_KEY}/transitions"
    echo "[$(date)] Transitioned ${ISSUE_KEY} to '${TARGET_STATUS}'" >> /opt/claude-automation/logs/run.log
  else
    echo "[$(date)] WARNING: No transition found to '${TARGET_STATUS}' for ${ISSUE_KEY}" >> /opt/claude-automation/logs/run.log
  fi
}

# Fetch next Jira story
python3 /opt/claude-automation/fetch_stories.py
STORY=$(cat /tmp/current_story.json)
STORY_ID=$(echo $STORY | jq -r '.key')
SUMMARY=$(echo $STORY | jq -r '.fields.summary')
DESCRIPTION=$(echo $STORY | jq -r '._claude.plain_description // ""')
REPO_URL=$(echo $STORY | jq -r '._claude.repo_url // empty')

if [ -z "$REPO_URL" ]; then
  echo "[$(date)] ERROR: No repo URL in [claude-config] for ${STORY_ID}" >> /opt/claude-automation/logs/run.log
  exit 1
fi

# Derive a directory name from the repo URL
REPO_NAME=$(basename "$REPO_URL" .git)
REPO_DIR="/opt/claude-automation/repos/${REPO_NAME}"

# Clone or pull the repo
if [ -d "$REPO_DIR/.git" ]; then
  cd "$REPO_DIR"
  git fetch origin
else
  mkdir -p /opt/claude-automation/repos
  git clone "$REPO_URL" "$REPO_DIR"
  cd "$REPO_DIR"
fi

# Move story to In Progress
jira_transition "$STORY_ID" "In Progress"

# Run Claude Code non-interactively
PROMPT="Implement the following Jira story: ${SUMMARY}. Details: ${DESCRIPTION}. Create the branch, commit, push, and open a PR as described in the ticket context. Commit message: feat(${STORY_ID}): ${SUMMARY}"
CLAUDE_OUTPUT=$(echo "$PROMPT" | claude --print --allowedTools Edit,Write,Bash 2>&1) && CLAUDE_EXIT=0 || CLAUDE_EXIT=$?

if [ "$CLAUDE_EXIT" -ne 0 ]; then
  echo "[$(date)] FAILED: ${STORY_ID} - Claude exited with code ${CLAUDE_EXIT}" >> /opt/claude-automation/logs/run.log

  # Truncate output for Jira comment (max ~5000 chars)
  TRUNCATED_OUTPUT=$(echo "$CLAUDE_OUTPUT" | tail -c 5000)

  # Add comment to Jira issue explaining the failure
  COMMENT_BODY=$(jq -n --arg output "$TRUNCATED_OUTPUT" --arg exit_code "$CLAUDE_EXIT" '{
    "body": {
      "type": "doc",
      "version": 1,
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Claude Code failed to implement this ticket.",
              "marks": [{"type": "strong"}]
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": ("Exit code: " + $exit_code)
            }
          ]
        },
        {
          "type": "codeBlock",
          "attrs": {"language": "text"},
          "content": [
            {
              "type": "text",
              "text": $output
            }
          ]
        }
      ]
    }
  }')

  curl -s -u "${JIRA_AUTH}" -X POST \
    -H "Content-Type: application/json" \
    -d "$COMMENT_BODY" \
    "${JIRA_BASE_URL}/rest/api/3/issue/${STORY_ID}/comment"

  # Move story to Needs Revision
  jira_transition "$STORY_ID" "Needs Revision"
  exit 1
fi

# Move story to In Review
jira_transition "$STORY_ID" "In Review"

echo "[$(date)] Done: $STORY_ID -> PR opened" >> /opt/claude-automation/logs/run.log
