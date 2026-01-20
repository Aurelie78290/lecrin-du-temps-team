import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRoutesProps {
  children?: React.ReactNode; // ← Optionnel maintenant
  roleRequired?: string;
}

const ProtectedRoutes = ({ children, roleRequired }: ProtectedRoutesProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Chargement</div>;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  // Si children fourni → ancien pattern
  // Sinon → layout route avec Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoutes;
