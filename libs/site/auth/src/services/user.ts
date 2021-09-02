import api from './api'

export type ICurrentUser = {
  username: string;
  email: string;
  tenant: string;
  createdAt: string;
  updatedAt: string;
}

export async function getCurrentUser(): Promise<ICurrentUser> {
  const { data } = await api.get("/auth/me");
  return data
};

