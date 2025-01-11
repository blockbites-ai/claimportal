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
    <div className="min-h-screen bg-[#F8BB33] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Info */}
          <Card>
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
          <Card>
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
          <Card>
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
          <Card className={cn({
            "bg-[#339D53]/10": eligibilityData?.isEligible,
            "bg-muted": !eligibilityData?.isEligible && !isCheckingEligibility,
          })}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Claim Status</h3>
                  <p className={cn(
                    "text-sm",
                    {
                      "text-[#339D53]": eligibilityData?.isEligible,
                      "text-muted-foreground": !eligibilityData?.isEligible || isCheckingEligibility,
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
                  className="min-w-[120px]"
                  variant={eligibilityData?.isEligible ? "default" : "secondary"}
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