export interface UserData {
  username: string;
  walletId: string;
  streakCount: number;
  isEligible: boolean;
  hasClaimed: boolean;
  balance: number;
  nextClaimDays: number;
}

export interface RegistrationState {
  walletId: string;
  email: string;
  password: string;
}