import axios from "axios";

export default function errorHandler(err: unknown): Error {
  if (axios.isAxiosError(err)) {
    throw new Error(err.response?.data.message)
  }
  throw new Error("Ocorreu um error ao acessar o servidor")
}
