function getLocalTenantId() {
  const user = JSON.parse(localStorage.getItem("user") as string);
  return user?.tenant;
}

function getLocalRefreshToken() {
  const user = JSON.parse(localStorage.getItem("user") as string);
  return user?.refreshToken;
}

function getLocalAccessToken() {
  const user = JSON.parse(localStorage.getItem("user") as string);
  return user?.accessToken;
}

function updateLocalAccessToken(token: string) {
  const user = JSON.parse(localStorage.getItem("user") as string);
  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem("user") as string);
}

function setUser(user: { accessToken: string, refreshToken: string, tenant: string }) {
  localStorage.setItem("user", JSON.stringify(user));
}

function removeUser() {
  localStorage.removeItem("user");
}

const TokenService = {
  getLocalTenantId,
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser
}

export default TokenService
