import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function ClerkLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      navigate={(to) => navigate(to)}
    >
      <header className="header">
        <UserButton afterSignOutUrl="/" />
      </header>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
}