import { DateTime, Interval } from "luxon";

export default function InternvalOfDays(start: DateTime, end: DateTime) {
  function* daysInterval(interval: Interval) {
    let cursor = interval.start.startOf("day");
    while (cursor < interval.end) {
      yield cursor;
      cursor = cursor.plus({ days: 1 });
    }
  }

  const interval = Interval.fromDateTimes(start, end);
  return Array.from(daysInterval(interval));

}
