import requests, json, os, re

from dotenv import load_dotenv
load_dotenv('/opt/claude-automation/.env')
BASE = os.getenv('JIRA_BASE_URL')
AUTH = (os.getenv('JIRA_EMAIL'), os.getenv('JIRA_API_TOKEN'))
JQL  = 'project=KAN AND status="To Do" AND summary ~ "\\\\[CC\\\\]" ORDER BY priority ASC'
r = requests.get(f'{BASE}/rest/api/3/search/jql',
    params={'jql': JQL, 'maxResults': 1, 'fields': 'summary,status,description'},
    auth=AUTH)
issue = r.json()['issues'][0]

# Extract plain text from ADF description
def adf_to_text(node):
    if isinstance(node, str):
        return node
    if isinstance(node, dict):
        if node.get('type') == 'text':
            return node.get('text', '')
        return ''.join(adf_to_text(c) for c in node.get('content', []))
    if isinstance(node, list):
        return ''.join(adf_to_text(c) for c in node)
    return ''

desc_adf = issue.get('fields', {}).get('description') or {}
plain_desc = adf_to_text(desc_adf)

# Parse [claude-config] block
repo_url = None
match = re.search(r'\[claude-config\](.*?)\[/claude-config\]', plain_desc, re.DOTALL)
if match:
    config_block = match.group(1)
    repo_match = re.search(r'repo:\s*(\S+)', config_block)
    if repo_match:
        repo_url = repo_match.group(1)

issue['_claude'] = {
    'plain_description': plain_desc,
    'repo_url': repo_url,
}

json.dump(issue, open('/tmp/current_story.json', 'w'), indent=2)
