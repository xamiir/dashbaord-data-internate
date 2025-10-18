export interface LoginPayload {
  username: string;
  password: string;
}

export interface VerifyOTPPayload {
  username: string;
  otp: string;
}

export interface IUser {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  is_2fa_enabled: boolean;
  is_email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface IUserDTO {
  name: string;
  phone: string;
  email: string;
  status?: string;
}
