import errorHandler from '../utils/error-handler';
import api from './api'

export type ICurrentUser = {
  username: string;
  email: string;
  tenant: string;
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

export async function getCurrentUser() {
  try {
    const { data } = await api.get("/auth/currentuser");
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

