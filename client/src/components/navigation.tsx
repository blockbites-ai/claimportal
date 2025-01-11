import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentStep: string;
}

export function Navigation({ currentStep }: NavigationProps) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "cursor-default text-lg font-semibold"
                )}
              >
                NFT Auth Demo
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            {currentStep && `Current Step: ${currentStep}`}
          </div>
        </div>
      </div>
    </div>
  );
}