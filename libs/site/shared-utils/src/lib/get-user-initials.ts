export default function getUserInitials(username: string | undefined) {
  if (username) {
    const name = username.split(" ");
    if (name.length === 1) return name[0][0];
    return `${name[0][0]}${name[1][0]}`;
  }
  return ".";
}
