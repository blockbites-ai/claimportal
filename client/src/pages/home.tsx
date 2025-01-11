import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RegistrationStepper } from "@/components/registration-stepper";
import { LoginForm } from "@/components/login-form";
import { Dashboard } from "@/components/dashboard";
import { Navigation } from "@/components/navigation";
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

type AuthState = "connect_wallet" | "validate_nft" | "login" | "register" | "authenticated";

const getStepTitle = (state: AuthState): string => {
  switch (state) {
    case "connect_wallet":
      return "Connect Wallet";
    case "validate_nft":
      return "Validate NFT";
    case "login":
      return "Sign In";
    case "register":
      return "Create Account";
    case "authenticated":
      return "Dashboard";
    default:
      return "";
  }
};

export default function Home() {
  const [authState, setAuthState] = useState<AuthState>("connect_wallet");
  const [walletId, setWalletId] = useState("");
  const [userData, setUserData] = useState(mockUserData);
  const { toast } = useToast();

  const handleSignOut = () => {
    setAuthState("connect_wallet");
    setWalletId("");
    setUserData(mockUserData);
  };

  const handleWalletConnect = (id: string) => {
    if (!id) {
      toast({
        title: "Error",
        description: "Please enter a wallet ID",
        variant: "destructive",
      });
      return;
    }
    setWalletId(id);
    setAuthState("validate_nft");
  };

  const handleNFTValidation = () => {
    setTimeout(() => {
      setAuthState("login");
    }, 1500);
  };

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
      walletId,
    }));
    setAuthState("authenticated");
  };

  const renderContent = () => {
    switch (authState) {
      case "connect_wallet":
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6">
                  <Wallet className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Connect Wallet</h2>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="walletId">Wallet ID</Label>
                  <Input
                    id="walletId"
                    placeholder="Enter your wallet ID"
                    value={walletId}
                    onChange={(e) => setWalletId(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleWalletConnect(walletId)}
                >
                  Connect Wallet
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "validate_nft":
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Shield className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
                <p>Validating NFT holder status...</p>
                <Button
                  className="mt-6"
                  onClick={handleNFTValidation}
                >
                  Simulate Validation
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "login":
        return (
          <div className="space-y-4 w-full max-w-md mx-auto">
            <LoginForm
              onSuccess={handleLoginSuccess}
              onRegister={() => setAuthState("register")}
              walletId={walletId}
            />
          </div>
        );

      case "register":
        return (
          <RegistrationStepper
            onComplete={handleRegistrationComplete}
            walletId={walletId}
            onLogin={() => setAuthState("login")}
          />
        );

      case "authenticated":
        return <Dashboard userData={userData} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentStep={getStepTitle(authState)} 
        showSignOut={authState === "authenticated"}
        onSignOut={handleSignOut}
      />
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
}