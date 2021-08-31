import axios from "axios";

const API_URL = `${process.env.NX_APP_API}:${process.env.NX_API_PORT}/auth`;

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
    return await axios.post(API_URL + "/signup", { username, email, password })
  } catch (err) {
    return errorHandler(err)
  }
};

export async function signin({ email, password }: IAuth) {
  try {
    const { data } = await axios.post(API_URL + "/signin", { email, password })
    if (data?.accessToken) {
      localStorage.setItem("userData", JSON.stringify(data));
    }
    return data;
  } catch (err) {
    return errorHandler(err)
  }
};

export function logout() {
  localStorage.removeItem("userData");
};
