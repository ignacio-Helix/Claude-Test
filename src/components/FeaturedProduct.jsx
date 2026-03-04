const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function FeaturedProduct() {
  return (
    <section className="section featured-product-section">
      <div className="container">
        <div className="featured-product-card">
          <div className="featured-product-image">
            <div className="product-showcase">
              <div className="showcase-circle"></div>
              <div className="showcase-box">
                <div className="showcase-label">NEW</div>
              </div>
            </div>
          </div>
          <div className="featured-product-info">
            <span className="featured-tag">Featured Product</span>
            <h2>Acuvue Oasys with Transitions</h2>
            <p>
              Experience the first light-adaptive contact lens. Oasys with Transitions
              seamlessly adjusts from clear to dark, reducing exposure to bright light
              — indoors, outdoors, and in-between.
            </p>
            <ul className="feature-list">
              <li><CheckIcon /> Light-adaptive technology</li>
              <li><CheckIcon /> UV protection built in</li>
              <li><CheckIcon /> All-day comfort with HydraLuxe</li>
            </ul>
            <div className="featured-product-price">
              <span className="price-current">$42.99</span>
              <span className="price-old">$54.99</span>
              <span className="price-save">Save 22%</span>
            </div>
            <a href="#" className="btn btn-primary btn-lg">View Product</a>
          </div>
        </div>
      </div>
    </section>
  );
}
