import { Link, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import "./Navbar.css";

import home from "../../assets/images/home.svg";
// Importe tes images
import book from "../../assets/images/icon/book.svg";
import envelope from "../../assets/images/icon/envelope.svg";
import facebook from "../../assets/images/icon/facebook.svg";
import handbag from "../../assets/images/icon/handbag.svg";
import info from "../../assets/images/icon/info-square.svg";
import instagram from "../../assets/images/icon/instagram.png";
import linkedin from "../../assets/images/icon/linkedin.svg";
import people from "../../assets/images/icon/people.svg";
import person from "../../assets/images/icon/person.svg";
import tiktok from "../../assets/images/icon/tiktok.svg";
import watch from "../../assets/images/icon/watch.svg";
import logo from "../../assets/images/logo.svg";
import annonce from "../../assets/images/icon/Annonces.svg";
import ThemeChange from "../ThemeChange/ThemeChange";

function Navbar({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const { user } = useAuth();
  return (
    <div>
      <button
        type="button"
        className="burger-btn"
        onClick={() => setExpanded(!expanded)}
      >
        {" "}
        ☰
      </button>
      <nav
        className={`sidebar ${expanded ? "expanded" : ""}`}
        onMouseEnter={() => window.innerWidth > 600 && setExpanded(true)}
        onMouseLeave={() => window.innerWidth > 600 && setExpanded(false)}
      >
        {/* Header : logo + toggle */}
        <div className="sidebar-header">
          <img src={logo} alt="Écrin du temps" className="logo" />
        </div>

        {/* Menu principal */}
        <ul className="menu">
          <li className={isActive("/") ? "active" : ""}>
            <Link
              to={user?.role === "admin" ? "/dashboard" : "/Accueil"}
              onClick={() => setExpanded(false)}
            >
              <div className="icon-wrapper">
                <img src={home} alt="" />
              </div>
              <span>Accueil</span>
            </Link>
          </li>

          <li className={isActive("/Collection") ? "active" : ""}>
            {user?.role === "admin" ? (
              <Link to="/ClassifiedAd" onClick={() => setExpanded(false)}>
                <div className="icon-wrapper">
                  <img src={annonce} alt="" />
                </div>
                <span>Annonces</span>
              </Link>
            ) : (
              <Link to="/Collection" onClick={() => setExpanded(false)}>
                <div className="icon-wrapper">
                  <img src={watch} alt="" />
                </div>
                <span>Collection</span>
              </Link>
            )}
          </li>

          {user?.role === "admin" && (
            <li className={isActive("/Shop") ? "active" : ""}>
              <Link to="/" onClick={() => setExpanded(false)}>
                <div className="icon-wrapper">
                  <img src={handbag} alt="" />
                </div>
                <span>Transactions</span>
              </Link>
            </li>
          )}

          <li>
            <Link to="/Shop" onClick={() => setExpanded(false)}>
              <div className="icon-wrapper">
                <img src={handbag} alt="" />
              </div>
              <span>Boutique</span>
            </Link>
          </li>

          <li className={isActive("/News") ? "active" : ""}>
            <Link to="/News" onClick={() => setExpanded(false)}>
              <div className="icon-wrapper">
                <img src={book} alt="" />
              </div>
              <span>Actualités</span>
            </Link>
          </li>
          {user?.role === "admin" && (
            <li className={isActive("/UserManagement") ? "active" : ""}>
              <Link to="/UserManagement" onClick={() => setExpanded(false)}>
                <div className="icon-wrapper">
                  <img src={people} alt="" />
                </div>
                <span>Utilisateurs</span>
              </Link>
            </li>
          )}

          <li className={isActive("/UserProfil") ? "active" : ""}>
            <Link to="/UserProfil" onClick={() => setExpanded(false)}>
              <div className="icon-wrapper">
                <img src={person} alt="" />
              </div>
              <span>Profil</span>
            </Link>
          </li>

          <li className={isActive("/Contact") ? "active" : ""}>
            {user?.role === "admin" ? (
              <div />
            ) : (
              <Link to="/Contact" onClick={() => setExpanded(false)}>
                <div className="icon-wrapper">
                  <img src={envelope} alt="" />
                </div>
                <span>Contact</span>
              </Link>
            )}
          </li>

          <li className={isActive("/Collection") ? "active" : ""}>
            {user?.role === "admin" ? (
              <div />
            ) : (
              <Link to="/About" onClick={() => setExpanded(false)}>
                <div className="icon-wrapper">
                  <img src={info} alt="" />
                </div>
                <span>A propos</span>
              </Link>
            )}
          </li>
        </ul>

        {/* Footer : dark mode + réseaux + mentions */}
        <div className="sidebar-footer">
          <div className="theme-change-display">
            <ThemeChange />
          </div>

          <div className="social-links">
            <a href="/">
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a href="/">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="/">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="/">
              <img src={tiktok} alt="TikTok" />
            </a>
          </div>
          <div className="legal-links">
            <Link to="/LegalNotices">
              <span>Mentions légales</span>
            </Link>
            <Link to="/Cgu">
              <span>CGU</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
