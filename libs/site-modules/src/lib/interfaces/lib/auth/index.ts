interface CardInfoInterface {
  id: string;
  name: string;
  expirationMonth: number;
  expirationYear: number;
  firstSixDigits: string;
  lastFourDigits: string;
}

export interface SignUpInterface {
  name: string;
  email: string;
  password: string;
  planId: string;
  cardInfo?: CardInfoInterface
}

export interface SignInInterface {
  email: string,
  password: string
}

export interface SignInResponseInterface {
  accessToken: string;
  refreshToken: string;
  tenant: string;
}

export interface ForgotPasswordInterface {
  email: string;
}

export interface ForgotPasswordResponseInterface{
  email: string;
  date: string;
}

export interface ForgotPasswordCodeInterface {
  urlcode: string;
}

export interface ForgotPasswordCodeResponseInterface {
  code: string;
}

export interface ChangePasswordInterface {
  codeNumber: string;
  password: string;
}

export type UserInterface = {
  email: string;
  createdAt: string;
  updatedAt: string;
}