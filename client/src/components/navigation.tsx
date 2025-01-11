import { Button } from "@/components/ui/button";
import BlockbitesLogo from "@/images/Blockbites.svg";

interface NavigationProps {
  currentStep: string;
  showSignOut?: boolean;
  onSignOut?: () => void;
}

export function Navigation({
  currentStep,
  showSignOut,
  onSignOut,
}: NavigationProps) {
  const handleSignOut = async () => {
    if (onSignOut) {
      onSignOut();
    }
  };

  return (
    <div className="bg-[#F8BB33]">
      <div className="flex h-16 items-center justify-between px-4">
        <img src={BlockbitesLogo} alt="Blockbites" className="h-5" />
        {showSignOut && (
          <Button 
            variant="ghost" 
            onClick={handleSignOut} 
            className="text-[#263238] hover:text-[#263238]/80"
          >
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
}