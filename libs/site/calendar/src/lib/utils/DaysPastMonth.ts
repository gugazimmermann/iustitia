import { DateTime } from "luxon";
import { Weekdays } from ".";

export default function DaysPastMonth(
  start: DateTime,
  internval: DateTime[]
) {
  const cloneInterval = internval.slice(0);
  const lastDayPastMonth = start.minus({ days: 1 });
  const startDayOfWeek = Weekdays.indexOf(start.toFormat("cccc"));
  let j = 0;
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = lastDayPastMonth.minus({ days: j });
    cloneInterval.unshift(day);
    j++;
  }
  return cloneInterval;
}
