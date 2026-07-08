import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wand2, Compass, User, LogOut, Menu, X } from 'lucide-react';

function Navbar({ activePage = 'dashboard' }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/dashboard" className="navbar-brand">
          <Wand2 className="w-5 h-5 text-yellow-400 animate-float flex-shrink-0" />
          <span className="navbar-brand-text">Bodha Wizard Academy</span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links-desktop">
          <Link
            to="/dashboard"
            className={`nav-link ${activePage === 'dashboard' ? 'nav-link-active' : ''}`}
          >
            <Compass className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <Link
            to="/profile"
            className={`nav-link ${activePage === 'profile' ? 'nav-link-active' : ''}`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>

          <button onClick={handleLogout} className="nav-link nav-link-logout">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link
            to="/dashboard"
            className={`mobile-nav-link ${activePage === 'dashboard' ? 'nav-link-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <Compass className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <Link
            to="/profile"
            className={`mobile-nav-link ${activePage === 'profile' ? 'nav-link-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>

          <button
            onClick={() => { setMenuOpen(false); handleLogout(); }}
            className="mobile-nav-link nav-link-logout w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
