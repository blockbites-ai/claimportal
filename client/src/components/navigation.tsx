import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
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
    await supabase.auth.signOut();
    if (onSignOut) {
      onSignOut();
    }
  };

  return (
    <div className="border-b bg-[#F8BB33]">
      <div className="flex h-16 items-center px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "cursor-default text-lg font-semibold text-[#263238]",
                )}
              >
                <img src={BlockbitesLogo} alt="Blockbites" className="h-7" />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {showSignOut && (
          <div className="ml-auto">
            <Button variant="ghost" onClick={handleSignOut} className="text-[#263238] hover:text-[#263238]/80">
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}