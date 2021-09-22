import { DateTime } from "luxon";

export default function IsWeekend(day: DateTime) {
  const dayOfWeek = day.toFormat("c");
  return dayOfWeek === "6" || dayOfWeek === "7";
};
