import { brands } from '../data/brands';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function BrandsSection() {
  const ref = useScrollAnimation('.brand-card');

  return (
    <section className="section brands-section">
      <div className="container" ref={ref}>
        <div className="section-header">
          <h2>Over 35 Top Brands in Stock Nationwide</h2>
          <p>We carry the most trusted names in contact lenses and eyewear</p>
        </div>
        <div className="brands-grid">
          {brands.map((brand) => (
            <a href="#" className="brand-card animate-on-scroll" key={brand.id}>
              <div className="brand-logo-wrap">
                <div className="brand-letter">{brand.letter}</div>
              </div>
              <span>{brand.name}</span>
            </a>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: '2rem' }}>
          <a href="#" className="btn btn-outline">View All Brands</a>
        </div>
      </div>
    </section>
  );
}
