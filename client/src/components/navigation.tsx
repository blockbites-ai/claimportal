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
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "cursor-default text-lg font-semibold",
                )}
              >
                Blockbites
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {showSignOut && (
          <div className="ml-auto">
            <Button variant="ghost" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
