import { DateTime } from "luxon";

export default function DaysNextMonth(sliceOfWeeks: DateTime[][], internval: DateTime[]) {
  const cloneSliceOfWeeks = sliceOfWeeks.slice(0);
  let j = 0;
  for (let i = sliceOfWeeks[sliceOfWeeks.length - 1].length; i < 7; i++) {
    j++;
    const dayToAdd = internval[internval.length - 1].plus({ days: j });
    sliceOfWeeks[sliceOfWeeks.length - 1][
      sliceOfWeeks[sliceOfWeeks.length - 1].length
    ] = dayToAdd;
  }
  return cloneSliceOfWeeks;
}
