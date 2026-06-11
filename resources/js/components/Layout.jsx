import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// ─── Breaking News Ticker ─────────────────────────────────────────────────────
function BreakingTicker() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/posts/breaking').then(r => setItems(r.data));
  }, []);

  if (!items.length) return null;

  return (
    <div className="breaking-bar">
      <span className="breaking-label">BREAKING</span>
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...items, ...items].map((item, i) => (
            <Link key={i} to={`/post/${item.slug}`} className="ticker-item">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/categories').then(r => setCategories(r.data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-top">
          <Link to="/" className="logo">
            <span className="logo-main">CAMBO</span>
            <span className="logo-sub">REPORT</span>
          </Link>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="ស្វែងរកព័ត៌មាន..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>ទំព័រដើម</Link>
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="nav-link"
              style={{ '--cat-color': cat.color }}
              onClick={() => setMenuOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="logo">
              <span className="logo-main">CAMBO</span>
              <span className="logo-sub">REPORT</span>
            </Link>
            <p className="footer-desc">ព័ត៌មានថ្មីៗ ត្រឹមត្រូវ និងអព្យាក្រឹត</p>
          </div>
          <div>
            <h4>ផ្នែក</h4>
            <ul>
              <li><Link to="/">ទំព័រដើម</Link></li>
              <li><Link to="/category/politics">នយោបាយ</Link></li>
              <li><Link to="/category/economy">សេដ្ឋកិច្ច</Link></li>
              <li><Link to="/category/sport">កីឡា</Link></li>
            </ul>
          </div>
          <div>
            <h4>ទំនាក់ទំនង</h4>
            <p>📧 info@cambo-report.com</p>
            <p>📞 +855 23 000 000</p>
            <p>📍 ភ្នំពេញ, កម្ពុជា</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Cambo Report. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Layout ────────────────────────────────────────────────────────────────────
export default function Layout() {
  return (
    <div className="site-wrapper">
      <BreakingTicker />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
