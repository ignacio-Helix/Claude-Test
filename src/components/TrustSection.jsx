import { trustItems } from '../data/trustItems';
import useScrollAnimation from '../hooks/useScrollAnimation';

const iconMap = {
  shipping: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0b5ed7" strokeWidth="1.5">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  authentic: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  dispatch: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  support: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

export default function TrustSection() {
  const ref = useScrollAnimation('.trust-card');

  return (
    <section className="section trust-section">
      <div className="container" ref={ref}>
        <div className="section-header">
          <h2>Why Choose CLX Webstore</h2>
          <p>Trusted by over 500,000 customers nationwide</p>
        </div>
        <div className="trust-grid">
          {trustItems.map((item) => (
            <div className="trust-card animate-on-scroll" key={item.id}>
              <div className="trust-icon">{iconMap[item.id]}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
