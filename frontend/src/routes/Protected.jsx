import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((s) => s.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export function VendorRoute({ children }) {
  const { user } = useSelector((s) => s.auth);

  if (!user) return <Navigate to="/login" />;
  if (!user.is_vendor) return <Navigate to="/" />;

  return children;
}