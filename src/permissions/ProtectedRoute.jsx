import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleRequired }) {
  const { isLoaded, isSignedIn, user } = useUser();
  
  // ADD THIS LINE: Check if the secret password was entered
  const isDevAdmin = localStorage.getItem("dev_admin") === "true";

  if (!isLoaded) return null;
  
  // If dev password is correct, let them in immediately
  if (isDevAdmin) return children;

  if (!isSignedIn) return <RedirectToSignIn />;

  const userRole = user.publicMetadata.role;

  if (roleRequired === "admin" && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (roleRequired === "editor" && userRole !== "editor" && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}