export interface AuthState {
  authenticated: boolean;
  expiration: Date;
  token: string;
  roles: string[];
  user: string;
  status: string;
  error: number;
  email: string;
}
