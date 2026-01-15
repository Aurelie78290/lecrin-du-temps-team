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
          email: formData.email,
          password: formData.password,
        });
        login(res.data); // pour stocker le user dans le context //
        navigate(res.data.role === "admin" ? "/dashboard" : "/user-profil");
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
      <h2>{isLogin ? "Se connecter" : "Créer un compte"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
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
          </>
        )}
        <input
          type="text"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>

      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Pas encore de compte? Inscrivez-vous"
          : "Déjà un compte ? Connectez-vous"}
      </button>
    </div>
  );
};

export default LoginSignUp;
