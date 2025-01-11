import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Trophy,
  Check,
  Timer,
  Coins,
  User,
  Loader2,
} from "lucide-react";
import type { UserData } from "@/lib/types";
import { useEligibility } from "@/hooks/useEligibility";

interface DashboardProps {
  userData: UserData;
}

export function Dashboard({ userData }: DashboardProps) {
  const { data: isEligible, isLoading: isCheckingEligibility } = useEligibility(userData.email);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <User className="w-4 h-4 inline-block mr-2" />
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.username}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <Wallet className="w-4 h-4 inline-block mr-1" />
              {userData.walletId}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Trophy className="w-4 h-4 inline-block mr-2" />
              Streak Count
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.streakCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Current streak maintained
            </p>
          </CardContent>
        </Card>

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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Timer className="w-4 h-4 inline-block mr-2" />
              Next Claim
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.nextClaimDays} days</div>
            <div className="text-xs text-muted-foreground mt-1">
              Until next available claim
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Claim Status</h3>
              <p className="text-sm text-muted-foreground">
                {isCheckingEligibility ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Checking eligibility...
                  </span>
                ) : isEligible ? (
                  "You are eligible to claim"
                ) : (
                  "Not eligible for claiming"
                )}
              </p>
            </div>
            <Button
              disabled={!isEligible || userData.hasClaimed || isCheckingEligibility}
              className="min-w-[120px]"
            >
              <Check className="w-4 h-4 mr-2" />
              Claim
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}