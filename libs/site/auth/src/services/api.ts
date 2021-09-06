import axios, { AxiosInstance } from "axios";
import TokenService from "./token";

const API_URL = `${process.env.NX_APP_API}:${process.env.NX_API_PORT}`;

const RefreshTokenAuthPaths = [
  "/auth/signup",
  "/auth/signin",
  "/auth/forgotpassword",
  "/auth/changepassword",
  "/auth/me"
]

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = TokenService.getLocalAccessToken();
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
},
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((res) => {
  return res;
},
  async (err) => {
    const originalConfig = err.config;
    if (!RefreshTokenAuthPaths.includes(originalConfig.url) && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await api.post("/auth/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });
          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);
          return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default api;
