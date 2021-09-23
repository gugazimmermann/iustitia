import { DateTime } from "luxon";
import { InternvalOfDays, DaysPastMonth, ArraySlice, DaysNextMonth } from "..";

export default function getDaysToShow(
  selectedDate: DateTime,
  pediod: "week" | "month",
) {
  let daysToShow = [];
  let end = selectedDate.startOf(pediod);
  end = pediod === "month" ? end.plus({ months: 1 }) : end.plus({ weeks: 1 });
  const dateTimeInternval = InternvalOfDays(
    selectedDate.startOf(pediod),
    end
  );
  if (pediod === "month") {
    const intervalWithPastMonth = DaysPastMonth(selectedDate.startOf(pediod), dateTimeInternval);
    const sliceOfWeeks = ArraySlice(intervalWithPastMonth, 7);
    const daysNextMonth = DaysNextMonth(sliceOfWeeks, intervalWithPastMonth);
    daysToShow = daysNextMonth.reduce( (a,b) => a.concat(b))
  } else {
    daysToShow = dateTimeInternval;
  }

  return daysToShow;
}
