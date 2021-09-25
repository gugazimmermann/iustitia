import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";
import TokenService from "./token";

export interface CardInfoInterface {
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

export async function signup({ name, email, password, planId, cardInfo }: SignUpInterface): Promise<{ message: string } | Error> {
  try {
    const { data } = await api.post("/auth/signup", { name, email, password, planId, cardInfo });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function signin({ email, password }: { email: string, password: string }): Promise<{
  accessToken: string;
  refreshToken: string;
  tenant: string;
} | Error> {
  try {
    const { data } = await api.post("/auth/signin", { email, password })
    if (data?.accessToken) TokenService.setUser(data);
    return data;
  } catch (err) {
    return errorHandler(err)
  }
};

export async function forgotpassword(email: string): Promise<{
  email: string;
  date: string;
} | Error> {
  try {
    const res = await api.post("/auth/forgotpassword", { email })
    return {
      email: res.data.email,
      date: res.data.date
    }
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getforgotpasswordcode(urlcode: string): Promise<{
  code: string;
} | Error> {
  try {
    const { data } = await api.post("/auth/forgotpasswordcode", { urlcode });
    return data;
  } catch (err) {
    return errorHandler(err)
  }
};

export async function changepassword(codeNumber: string, password: string): Promise<void | Error> {
  const code = `${codeNumber}`.trim().replace(" ", "");
  try {
    await api.post("/auth/changepassword", { code, password })
  } catch (err) {
    return errorHandler(err)
  }
};

export function logout(): void {
  TokenService.removeUser();
};

export function getUser(): string {
  return TokenService.getLocalAccessToken();
}
