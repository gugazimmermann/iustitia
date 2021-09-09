export default function getUserInitials(name: string | undefined) {
  if (name) {
    const splitMame = name.split(" ");
    if (splitMame.length === 1) return splitMame[0][0];
    return `${splitMame[0][0]}${splitMame[1][0]}`;
  }
  return ".";
}
