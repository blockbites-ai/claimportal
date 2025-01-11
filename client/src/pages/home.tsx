import { useState } from "react";
import { RegistrationStepper } from "@/components/registration-stepper";
import { LoginForm } from "@/components/login-form";
import { Dashboard } from "@/components/dashboard";
import type { RegistrationState, UserData } from "@/lib/types";

const mockUserData: UserData = {
  username: "User Name Example",
  walletId: "",
  streakCount: 3,
  isEligible: true,
  hasClaimed: false,
  balance: 50,
  nextClaimDays: 2,
};

type AuthState = "login" | "register" | "authenticated";

export default function Home() {
  const [authState, setAuthState] = useState<AuthState>("login");
  const [userData, setUserData] = useState(mockUserData);

  const handleRegistrationComplete = (data: RegistrationState) => {
    setUserData((prev) => ({
      ...prev,
      walletId: data.walletId,
    }));
    setAuthState("authenticated");
  };

  const handleLoginSuccess = (data: { email: string }) => {
    setUserData((prev) => ({
      ...prev,
      username: data.email,
    }));
    setAuthState("authenticated");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {authState === "login" && (
        <LoginForm
          onSuccess={handleLoginSuccess}
          onRegister={() => setAuthState("register")}
        />
      )}
      {authState === "register" && (
        <RegistrationStepper onComplete={handleRegistrationComplete} />
      )}
      {authState === "authenticated" && <Dashboard userData={userData} />}
    </div>
  );
}