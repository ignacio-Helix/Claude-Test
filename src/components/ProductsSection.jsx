import { products } from '../data/products';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function ProductsSection() {
  const ref = useScrollAnimation('.product-card');

  return (
    <section className="section products-section">
      <div className="container" ref={ref}>
        <div className="section-header">
          <h2>Popular Products</h2>
          <p>Best sellers loved by our customers</p>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card animate-on-scroll" key={product.id}>
              <div className="product-image">
                {product.badge && (
                  <span className={`product-badge ${product.badgeClass}`}>{product.badge}</span>
                )}
                <div className="product-img-placeholder" style={{ '--p-color': product.color }}>
                  <span>{product.abbr}</span>
                </div>
              </div>
              <div className="product-info">
                <span className="product-brand">{product.brand}</span>
                <h4>{product.name}</h4>
                <div className="product-rating">
                  <span className="stars">{product.stars}</span>
                  <span className="rating-count">{product.ratingCount}</span>
                </div>
                <div className="product-price">
                  <span className="price-now">{product.priceNow}</span>
                  <span className="price-was">{product.priceWas}</span>
                </div>
                <a href="#" className="btn btn-primary btn-sm btn-block">Add to Cart</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
