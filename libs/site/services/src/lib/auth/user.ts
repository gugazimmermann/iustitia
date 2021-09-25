import { errorHandler } from "@iustitia/site/shared-utils";
import api from '../api'

export type UserInterface = {
  email: string;
  createdAt: string;
  updatedAt: string;
}

export async function getMe() {
  try {
    const { data } = await api.get("/auth/me");
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
