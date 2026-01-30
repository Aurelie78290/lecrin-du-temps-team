import type React from "react";
import { useState } from "react";
import "./Home.css";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import logo from "../../../public/logo.svg";
import watchImage from "../../assets/images/watchImage.png";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import { Link } from "react-router-dom";
// import WatchAnimation from "../../components/WatchAnimation/WatchAnimation";

const Home: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Connexion avec :", { email, password });
  // };
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // LogIn //
        const res = await api.post("/api/login", {
          email: formData.email,
          password: formData.password,
        });
        login(res.data); // pour stocker le user dans le context //
        navigate(res.data.role === "admin" ? "/dashboard" : "/Accueil");
      } else {
        //SignUp //
        await api.post("/api/users", formData);
        alert("Compte créé. Connectez-vous");
        setIsLogin(true); // permet de basculer automatiquement vers le login //
      }
    } catch (err) {
      alert("Erreur de connexion");
    }
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
          {/* <div className="left-side"><WatchAnimation /></div> */}
          <div className="image-block">
            <img
              src={watchImage}
              alt="Montre de luxe"
              className="featured-watch"
            />
          </div>
          <div className="right-side">
            <div className="form-block">
              <h2 className="home-main-subtitle">
                {isLogin
                  ? "Les montres d'exception, réunies pour vous"
                  : "Rejoignez l'excellence"}
              </h2>

              <h3>{isLogin ? "Bienvenue" : "Inscription"}</h3>

              <form onSubmit={handleSubmit} className="login-form">
                {!isLogin && (
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Prénom"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, firstname: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Nom"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, lastname: e.target.value })
                      }
                    />
                  </div>
                )}
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="input-row">
                  <input
                    type="password"
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
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
              <div className="options">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="signup-link-btn"
                >
                  {isLogin ? "Créez votre compte" : "J'ai déjà un compte"}
                </button>
                {isLogin && (
                  <Link
                    to="/forgot-password"
                    title="Mot de passe oublié?"
                    className="forgot-password-link"
                  >
                    Mot de passe oublié?
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

// <a href="/" className="signup-link">
//   Je ne suis pas encore inscrit
// </a>
