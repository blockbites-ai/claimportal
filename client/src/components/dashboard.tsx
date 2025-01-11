import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Trophy,
  Timer,
  Coins,
  Check,
  Loader2,
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Info */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <User className="w-4 h-4 inline-block mr-2" />
                Account Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">{userData.email}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {eligibilityData?.isEligible ? (
                  <span>Member since {formatDate(eligibilityData.eligibleDate)}</span>
                ) : (
                  "Membership pending"
                )}
              </div>
            </CardContent>
          </Card>

          {/* Streak Information */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Trophy className="w-4 h-4 inline-block mr-2" />
                Streak Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eligibilityData?.streakCount || 0}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Streaks maintained
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Last streak: {formatDate(eligibilityData?.lastStreakDate)}
              </div>
            </CardContent>
          </Card>

          {/* Balance */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Coins className="w-4 h-4 inline-block mr-2" />
                Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.balance} tokens</div>
              <div className="text-xs text-muted-foreground mt-1">
                Available for use
              </div>
            </CardContent>
          </Card>

          {/* Claim Status */}
          <Card className={cn(
            "bg-white",
            {
              "bg-[#339D53]/10 border-[#339D53]/20": eligibilityData?.isEligible,
              "bg-gray-100 border-gray-200": !eligibilityData?.isEligible && !isCheckingEligibility,
            }
          )}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Claim Status</h3>
                  <p className={cn(
                    "text-sm",
                    {
                      "text-[#339D53] font-medium": eligibilityData?.isEligible,
                      "text-gray-500": !eligibilityData?.isEligible || isCheckingEligibility,
                    }
                  )}>
                    {isCheckingEligibility ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Checking eligibility...
                      </span>
                    ) : eligibilityData?.isEligible ? (
                      "You are eligible to claim"
                    ) : (
                      "Not eligible for claiming"
                    )}
                  </p>
                </div>
                <Button
                  disabled={!eligibilityData?.isEligible || userData.hasClaimed || isCheckingEligibility}
                  className={cn(
                    "min-w-[120px]",
                    eligibilityData?.isEligible 
                      ? "bg-[#339D53] hover:bg-[#339D53]/90" 
                      : "bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200"
                  )}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}