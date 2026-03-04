import useCarousel from '../hooks/useCarousel';
import { slides } from '../data/slides';

function SlideGraphic({ type }) {
  if (type === 'eye') {
    return (
      <div className="eye-graphic">
        <div className="eye-outer"></div>
        <div className="eye-inner"></div>
        <div className="eye-pupil"></div>
      </div>
    );
  }
  if (type === 'lens') {
    return (
      <div className="lens-graphic">
        <div className="lens-circle"></div>
        <div className="lens-shine"></div>
      </div>
    );
  }
  return (
    <div className="box-graphic">
      <div className="box"></div>
      <div className="box box-2"></div>
      <div className="box box-3"></div>
    </div>
  );
}

export default function HeroCarousel() {
  const { current, goTo, next, prev } = useCarousel(slides.length, 5000);

  return (
    <section className="hero">
      <div className="hero-carousel">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero-slide${i === current ? ' active' : ''}`}
            style={{ background: slide.background }}
          >
            <div className="container hero-content">
              <div className="hero-text">
                <span className="hero-badge">{slide.badge}</span>
                <h1>{slide.heading}</h1>
                <p>{slide.description}</p>
                <div className="hero-btns">
                  <a href="#" className="btn btn-white">{slide.btnPrimary}</a>
                  <a href="#" className="btn btn-outline-white">{slide.btnSecondary}</a>
                </div>
              </div>
              <div className="hero-image">
                <div className="hero-image-placeholder">
                  <SlideGraphic type={slide.graphic} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-dots">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            className={`dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
      <button className="hero-arrow hero-arrow-left" aria-label="Previous slide" onClick={prev}>
        &#8249;
      </button>
      <button className="hero-arrow hero-arrow-right" aria-label="Next slide" onClick={next}>
        &#8250;
      </button>
    </section>
  );
}
