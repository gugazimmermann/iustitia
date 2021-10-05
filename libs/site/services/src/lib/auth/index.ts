import { ModulesEnum } from "@iustitia/modules";
import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";
import TokenService from "./token";
import { ApiMessageRes } from "../interfaces";

export interface SignUpReq {
  name: string;
  email: string;
  password: string;
  planId: string;
  cardInfo?: {
    id: string;
    name: string;
    expirationMonth: number;
    expirationYear: number;
    firstSixDigits: string;
    lastFourDigits: string;
  }
}

export interface SignInReq {
  email: string,
  password: string
}

export interface SignInRes {
  accessToken: string;
  refreshToken: string;
  tenant: string;
}

export interface ForgotPasswordReq {
  email: string;
}

export interface ForgotPasswordRes {
  email: string;
  date: string;
}

export interface ForgotPasswordCodeReq {
  codeurl: string;
}

export interface ForgotPasswordCodeRes {
  code: string;
}

export interface ChangePasswordReq {
  codeNumber: string;
  password: string;
}

export interface UserRes {
  email: string;
  createdAt: string;
  updatedAt: string;
}

export async function signup({ name, email, password, planId, cardInfo }: SignUpReq): Promise<ApiMessageRes | Error> {
  try {
    const { data } = await api.post(`/api/${ModulesEnum.auth}/signup`, { name, email, password, planId, cardInfo });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function signin({ email, password }: SignInReq): Promise<SignInRes | Error> {
  try {
    const { data } = await api.post(`/api/${ModulesEnum.auth}/signin`, { email, password })
    if (data?.accessToken) TokenService.setUser(data);
    return data;
  } catch (err) {
    return errorHandler(err)
  }
};

export async function forgotpassword({ email }: ForgotPasswordReq): Promise<ForgotPasswordRes | Error> {
  try {
    const res = await api.post(`/api/${ModulesEnum.auth}/forgotpassword`, { email })
    return {
      email: res.data.email,
      date: res.data.date
    }
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getforgotpasswordcode({ codeurl }: ForgotPasswordCodeReq): Promise<ForgotPasswordCodeRes | Error> {
  try {
    const { data } = await api.post(`/api/${ModulesEnum.auth}/forgotpasswordcode`, { codeurl });
    return data;
  } catch (err) {
    return errorHandler(err)
  }
};

export async function changepassword({ codeNumber, password }: ChangePasswordReq): Promise<void | Error> {
  const code = `${codeNumber}`.trim().replace(/ /g, "");
  try {
    await api.post(`/api/${ModulesEnum.auth}/changepassword`, { code, password })
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getMe(): Promise<UserRes | Error> {
  try {
    const { data } = await api.get(`/api/${ModulesEnum.auth}/me`);
    return data
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
