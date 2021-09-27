export default function formatAddress(city: string | undefined, state: string | undefined) {
  if (city || state) {
    let res = city && city;
    res = city && state && res + " | ";
    res = state && res + state;
    return res;
  }
  return null;
}
