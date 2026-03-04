import { categories } from '../data/categories';
import useScrollAnimation from '../hooks/useScrollAnimation';

const iconMap = {
  contacts: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    </svg>
  ),
  eyeglasses: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="12" r="4" />
      <circle cx="18" cy="12" r="4" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  ),
  sunglasses: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="12" r="4" />
      <circle cx="18" cy="12" r="4" />
      <line x1="10" y1="12" x2="14" y2="12" />
      <line x1="2" y1="8" x2="4" y2="10" />
      <line x1="20" y1="10" x2="22" y2="8" />
    </svg>
  ),
  readers: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="8" cy="12" r="3" />
      <circle cx="16" cy="12" r="3" />
    </svg>
  ),
  lenscare: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  colorlenses: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

export default function CategoriesSection() {
  const ref = useScrollAnimation('.category-card');

  return (
    <section className="section categories-section">
      <div className="container" ref={ref}>
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find exactly what you need for perfect vision</p>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <a
              href="#"
              className="category-card animate-on-scroll"
              style={{ '--cat-color': cat.color }}
              key={cat.id}
            >
              <div className="category-icon">{iconMap[cat.id]}</div>
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
              <span className="category-arrow">&rarr;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
