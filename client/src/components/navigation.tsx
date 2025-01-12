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
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="h-6 w-auto">
          <img
            src={BlockbitesLogo}
            alt="Blockbites"
            className="h-full w-auto"
          />
        </div>
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