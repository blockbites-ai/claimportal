import { useQuery } from "@tanstack/react-query";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface EligibilityResponse {
  id: number;
  user_email: string;
  eligible_date: string;
  reason: string | null;
  streak_count: number;
  last_streak_date: string;
}

export interface EligibilityData {
  isEligible: boolean;
  eligibleDate: string | null;
  reason: string | null;
  streakCount: number;
  lastStreakDate: string | null;
}

export function useEligibility(email: string) {
  return useQuery({
    queryKey: ['eligibility', email],
    queryFn: async (): Promise<EligibilityData> => {
      if (!email) {
        return {
          isEligible: false,
          eligibleDate: null,
          reason: null,
          streakCount: 0,
          lastStreakDate: null
        };
      }

      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/eligible_users?user_email=eq.${encodeURIComponent(email)}`,
        {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to check eligibility');
      }

      const data: EligibilityResponse[] = await response.json();

      if (data.length === 0) {
        return {
          isEligible: false,
          eligibleDate: null,
          reason: null,
          streakCount: 0,
          lastStreakDate: null
        };
      }

      const user = data[0];
      return {
        isEligible: true,
        eligibleDate: user.eligible_date,
        reason: user.reason,
        streakCount: user.streak_count,
        lastStreakDate: user.last_streak_date
      };
    },
    retry: false,
  });
}