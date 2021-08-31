import axios from "axios";
import api from "./api";
import TokenService from "./token";

interface IAuth {
  username?: string;
  email: string;
  password: string;
}

function errorHandler(err: unknown): Error {
  if (axios.isAxiosError(err)) {
    throw new Error(err.response?.data.message)
  }
  throw new Error("Ocorreu um error ao acessar o servidor")
}

export async function signup({ username, email, password }: IAuth) {
  try {
    return await api.post("/auth/signup", { username, email, password })
  } catch (err) {
    return errorHandler(err)
  }
};

export async function signin({ email, password }: IAuth) {
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

export function logout() {
  TokenService.removeUser();
};
