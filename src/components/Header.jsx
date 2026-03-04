import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      headerRef.current.style.boxShadow =
        window.scrollY > 100
          ? '0 4px 20px rgba(0,0,0,0.1)'
          : '0 1px 2px rgba(0,0,0,0.05)';
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const input = searchRef.current;
    if (!input) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') input.blur();
    };
    input.addEventListener('keydown', handleKey);
    return () => input.removeEventListener('keydown', handleKey);
  }, []);

  const toggleMenu = () => setMenuOpen((o) => !o);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header" ref={headerRef}>
      <div className="container header-inner">
        <a href="#" className="logo">
          <span className="logo-icon">&#9678;</span> CLX <span className="logo-thin">Webstore</span>
        </a>

        <nav className={`nav${menuOpen ? ' open' : ''}`}>
          <a href="#" className="nav-link active" onClick={closeMenu}>Home</a>
          <a href="#" className="nav-link" onClick={closeMenu}>Contact Lenses</a>
          <a href="#" className="nav-link" onClick={closeMenu}>Eyeglasses</a>
          <a href="#" className="nav-link" onClick={closeMenu}>Readers</a>
          <a href="#" className="nav-link" onClick={closeMenu}>Brands</a>
          <a href="#" className="nav-link" onClick={closeMenu}>Deals</a>
        </nav>

        <div className="header-actions">
          <div className="search-box">
            <input type="text" placeholder="Search products..." ref={searchRef} />
            <button className="search-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
          <a href="#" className="icon-btn" aria-label="Account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>
          <a href="#" className="icon-btn cart-btn" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="cart-badge">2</span>
          </a>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            aria-label="Menu"
            onClick={toggleMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
