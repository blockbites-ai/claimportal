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

export function useEligibility(email: string) {
  return useQuery({
    queryKey: ['eligibility', email],
    queryFn: async (): Promise<boolean> => {
      if (!email) return false;

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
      return data.length > 0; // User is eligible if they exist in the table
    },
    retry: false,
  });
}