import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRoutesProps {
  children: React.ReactNode; // Représente la page protegée //
  roleRequired?: string; // Pour précisé si un rôle est nécéssaire //
}

const ProtectedRoutes = ({ children, roleRequired }: ProtectedRoutesProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Chargement</div>;

  if (!user) {
    return <Navigate to="/" />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" />; // si user pas admin alors redirigé. //
  }
  return children;
};

export default ProtectedRoutes;
