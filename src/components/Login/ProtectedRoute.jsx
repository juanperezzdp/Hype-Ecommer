import { Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import Loading from "../Loading/Loading";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/loginpage" />;

  return <>{children}</>;
}
