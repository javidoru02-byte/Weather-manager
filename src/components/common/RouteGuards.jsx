import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export function PublicOnlyRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}