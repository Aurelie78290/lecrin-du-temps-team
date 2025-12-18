import type React from "react";
import { useState } from "react";
import "./Home.css";
import { ArrowRight } from "lucide-react";
import logo from "../../../public/logo.svg";
import watchImage from "../../assets/images/watchImage.png";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Connexion avec :", { email, password });
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="home-main-title">L'ÉCRIN DU TEMPS</h1>
        </div>
      </header>

      <main className="home-main">
        <section className="content-split">
          <div className="image-block">
            <img
              src={watchImage}
              alt="Montre de luxe"
              className="featured-watch"
            />
          </div>

          <div className="form-block">
            <h2 className="home-main-subtitle">
              Les montres d'exception, réunies pour vous
            </h2>

            <h3>Bienvenue</h3>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-row">
                <input
                  type="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="submit-btn"
                  aria-label="Envoyer"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>

            <a href="/" className="signup-link">
              Je ne suis pas encore inscrit
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
