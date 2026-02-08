import type { RejectError } from "../../components/utils/getErrorMessage";

export type User = {
  name: string | null;
  email: string | null;
};

export interface AuthState {
  user: User;
  existingEmail: string | null;
  token: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: RejectError | null;
}

export interface ApiAuthResponse {
  _id?: string;
  name: string;
  email: string;
  token: string;
}
