import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Heart,
  Camera,
  CheckSquare,
  Home,
  ChefHat,
  MessageSquare
} from "lucide-react";
import type { UserData } from "@/lib/types";
import { useEligibility } from "@/hooks/useEligibility";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DashboardProps {
  userData: UserData;
}

export function Dashboard({ userData }: DashboardProps) {
  const { data: eligibilityData, isLoading: isCheckingEligibility } = useEligibility(userData.email);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFB800]">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Hello, {userData.username}</span>
        </div>
        <div className="flex items-center gap-2 bg-yellow-500/50 px-3 py-1 rounded-full">
          <span className="text-sm font-medium">Level 1/10</span>
          <div className="px-2 py-0.5 bg-yellow-400 rounded-full text-sm">
            {userData.balance}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 flex-1">
        {/* Stats Card */}
        <Card className="bg-green-500 text-white mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Heart className="w-6 h-6 mx-auto mb-1" />
                <div className="font-bold">{eligibilityData?.streakCount || 5}/5</div>
                <div className="text-xs">Lives</div>
              </div>
              <div>
                <Camera className="w-6 h-6 mx-auto mb-1" />
                <div className="font-bold">0/4</div>
                <div className="text-xs">Photos</div>
              </div>
              <div>
                <CheckSquare className="w-6 h-6 mx-auto mb-1" />
                <div className="font-bold">0/5</div>
                <div className="text-xs">Task</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak Days */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span>STREAK DAYS</span>
              <div className="bg-orange-500/20 p-1 rounded-full">
                <span className="text-orange-600">0</span>
              </div>
            </h3>
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4, 5].map((day) => (
                <div key={day} className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center",
                  day <= (eligibilityData?.streakCount || 0)
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300"
                )}>
                  {day}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Complete your daily streak
              <ul className="mt-2 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-green-500" />
                  Complete 1 section in Edubites
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4">•</div>
                  Upload 2 meals to Daily Snap
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t p-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <ChefHat className="h-5 w-5" />
            <span className="text-xs">Chef</span>
          </Button>
          <Button 
            variant="default"
            size="lg"
            className="rounded-full bg-green-500 hover:bg-green-600 -mt-8"
          >
            Start!
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Feedback</span>
          </Button>
        </div>
      </div>
    </div>
  );
}