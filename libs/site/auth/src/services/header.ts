export default function header() {
  const userData = localStorage.getItem('userData')
  if (!userData) {
    return { }
  }
  const user = JSON.parse(userData);
  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return { };
  }
}
