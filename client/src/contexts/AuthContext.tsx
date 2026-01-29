import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import api from "../services/api";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  birthdate?: string;
  tel?: string;
  user_photo?: string | null;
  user_describe?: string;
  street_number?: string;
  street?: string;
  zip_code?: string;
  city?: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Pour check si le user a déjà un cookie //
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data); // Si oui on remplit le user //
      } catch (err) {
        setUser(null); // Sinon on reste visiteur //
      } finally {
        setLoading(false); // Fin du chargement //
      }
    };
    checkUser();
  }, []);

  const login = (userData: User) => setUser(userData); // On met à jour le user lors du login //
  const logout = async () => {
    try {
      await api.get("/api/logout"); // Appel du server pour delete le cookie //
      setUser(null); // On met le user à null //
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // On fournit le contexte d'authentification aux composants enfants //
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
// Hook personnalisé pour utiliser le contexte d'authentification //
const useAuth = () => {
  const context = useContext(AuthContext); //  On récupère le contexte //
  if (!context) throw new Error("useAuth must be within AuthProvider"); // On s'assure que le hook est utilisé dans le bon contexte //
  return context;
};

export { AuthContext, AuthProvider, useAuth };
