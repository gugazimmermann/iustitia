import { errorHandler } from "@iustitia/site/shared-utils";
import api from "./api";
import TokenService from "./token";

export async function signup({ email, password }: { email: string, password: string }) {
  try {
    return await api.post("/auth/signup", { email, password })
  } catch (err) {
    return errorHandler(err)
  }
};

export async function signin({ email, password }: { email: string, password: string }) {
  try {
    const { data } = await api.post("/auth/signin", { email, password })
    if (data?.accessToken) {
      TokenService.setUser(data);
    }
    return data;
  } catch (err) {
    return errorHandler(err)
  }
};

export async function forgotpassword(email: string) {
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

export async function getforgotpasswordcode(urlcode: string) {
  try {
    return await api.post("/auth/forgotpasswordcode", { urlcode })
  } catch (err) {
    return errorHandler(err)
  }
};

export async function changepassword(code: string, password: string) {
  try {
    return await api.post("/auth/changepassword", { code, password })
  } catch (err) {
    return errorHandler(err)
  }
};

export function logout() {
  TokenService.removeUser();
};

export function getUser() {
  return TokenService.getLocalAccessToken();
}
