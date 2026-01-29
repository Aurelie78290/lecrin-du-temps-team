import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

const LoginSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          email: email,
          password: password,
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
    <div className="auth-container">
      {isLogin ? (
        <>
          <h2>Se connecter</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="login_email"
              placeholder="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
            <input
              type="password"
              name="login_password"
              placeholder="mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button type="submit">Se connecter</button>
          </form>
        </>
      ) : (
        <>
          <h2>Créer un compte</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Prénom"
              required
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Nom"
              required
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
            <input
              type="email"
              name="signup_email"
              placeholder="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              autoComplete="email"
            />
            <input
              type="password"
              name="signup_password"
              placeholder="mot de passe"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              autoComplete="new-password"
            />
            <button type="submit">S'inscrire</button>
          </form>
        </>
      )}

      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Pas encore de compte? Inscrivez-vous"
          : "Déjà un compte ? Connectez-vous"}
      </button>
    </div>
  );
};

export default LoginSignUp;
