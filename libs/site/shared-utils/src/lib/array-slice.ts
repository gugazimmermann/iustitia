export default function ArraySlice<T>(arr: T[], size: number) {
  const inWeeks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    inWeeks.push(arr.slice(i, i + size));
  }
  return inWeeks;
}
