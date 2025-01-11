import { useState } from "react";
import { RegistrationStepper } from "@/components/registration-stepper";
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

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState(mockUserData);

  const handleRegistrationComplete = (data: RegistrationState) => {
    setUserData((prev) => ({
      ...prev,
      walletId: data.walletId,
    }));
    setIsRegistered(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {!isRegistered ? (
        <RegistrationStepper onComplete={handleRegistrationComplete} />
      ) : (
        <Dashboard userData={userData} />
      )}
    </div>
  );
}
