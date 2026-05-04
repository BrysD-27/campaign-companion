export interface AuthResponse {
  token: string;
  userId: number;
  username: string;
  email: string;
  message?: string;
  passwordLastChangedAt?: string | null;
  profile?: {
    displayName: string | null;
    bio: string | null;
    avatarUrl: string | null;
  };
  preferences: {
    colorMode: string;
    baseColor: string;
    themeColor: string;
    fontSize: string;
  }
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}