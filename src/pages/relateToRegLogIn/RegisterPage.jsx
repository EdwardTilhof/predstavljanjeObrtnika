import { SignUp } from "@clerk/clerk-react";

export default function RegisterPage() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <SignUp routing="path" path="/register" signInUrl="/login" />
    </div>
  );
}