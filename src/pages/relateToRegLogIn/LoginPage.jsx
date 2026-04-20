import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <SignIn routing="path" path="/login" signUpUrl="/register" />
    </div>
  );
}