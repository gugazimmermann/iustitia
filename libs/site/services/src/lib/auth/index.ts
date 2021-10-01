import {
  ChangePasswordInterface,
  ForgotPasswordCodeInterface,
  ForgotPasswordCodeResponseInterface,
  ForgotPasswordInterface,
  ForgotPasswordResponseInterface,
  GetModule,
  SignInInterface,
  SignInResponseInterface,
  SignUpInterface,
  SiteModulesEnum,
  UserInterface
} from "@iustitia/site-modules";
import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";
import TokenService from "./token";
import { ApiMessageInterface } from "../interfaces";

const sitemodule = GetModule(SiteModulesEnum.auth);
if (!undefined) throw new Error("Module not Found!")

export async function signup(
  { name, email, password, planId, cardInfo }: SignUpInterface
): Promise<ApiMessageInterface | Error> {
  try {
    const { data } = await api.post(`/api/${sitemodule.name}/signup`, { name, email, password, planId, cardInfo });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function signin(
  { email, password }: SignInInterface
): Promise<SignInResponseInterface | Error> {
  try {
    const { data } = await api.post(`/api/${sitemodule.name}/signin`, { email, password })
    if (data?.accessToken) TokenService.setUser(data);
    return data;
  } catch (err) {
    return errorHandler(err)
  }
};

export async function forgotpassword(
  { email }: ForgotPasswordInterface
): Promise<ForgotPasswordResponseInterface | Error> {
  try {
    const res = await api.post(`/api/${sitemodule.name}/forgotpassword`, { email })
    return {
      email: res.data.email,
      date: res.data.date
    }
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getforgotpasswordcode(
  { urlcode }: ForgotPasswordCodeInterface
): Promise<ForgotPasswordCodeResponseInterface | Error> {
  try {
    const { data } = await api.post(`/api/${sitemodule.name}/forgotpasswordcode`, { urlcode });
    return data;
  } catch (err) {
    return errorHandler(err)
  }
};

export async function changepassword(
  { codeNumber, password }: ChangePasswordInterface
): Promise<void | Error> {
  const code = `${codeNumber}`.trim().replace(/ /g, "");
  try {
    await api.post(`/api/${sitemodule.name}/changepassword`, { code, password })
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getMe(): Promise<UserInterface | Error> {
  try {
    const { data } = await api.get(`/api/${sitemodule.name}/me`);
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
