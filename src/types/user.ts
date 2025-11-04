export interface LoginPayload {
  username: string;
  password: string;
}

export interface VerifyOTPPayload {
  username: string;
  otp: string;
}

export interface IUser {
  _id: string;
  id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
  apiKey: string;
  phone?: string;
  status?: string;
  is_email_verified?: boolean;
  is_2fa_enabled?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type User = IUser;

export interface IUserDTO {
  name: string;
  email: string;
  password: string;
  balance?: number;
  apiKey: string;
  phone?: string;
  status?: string;
}
