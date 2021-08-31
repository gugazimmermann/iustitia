import api from './api'

export async function getCurrentUser() {
  return await api.get("/auth/me");
};

