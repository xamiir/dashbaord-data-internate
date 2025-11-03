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
  name: string;
  email: string;
  password: string;
  balance: number;
  apiKey: string;
}

export type User = IUser;

export interface IUserDTO {
  name: string;
  email: string;
  password: string;
  balance?: number;
  apiKey: string;
}
