import { useState, useRef } from 'react';

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.value = '';
    setSubscribed(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-card">
          <h2>Get 15% Off Your First Order</h2>
          <p>Subscribe to our newsletter for exclusive deals, new arrivals, and eye care tips.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter your email address" required ref={inputRef} />
            <button
              type="submit"
              className="btn btn-primary"
              style={subscribed ? { background: '#0d9488', color: '#fff' } : {}}
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
