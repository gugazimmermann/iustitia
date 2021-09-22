import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { ArraySlice, Weekdays } from "../../utils";
import { CalendarDayInterface, PeriodType } from "../../Calendar";
import { CalendarDay, CalendarWeekTitle } from "../../..";
import styles from "../../Calendar.module.css";

export interface CalendarScreenProps {
  period: PeriodType;
  dateTime: DateTime;
  days: CalendarDayInterface[];
}

export function CalendarScreen({
  period,
  dateTime,
  days,
}: CalendarScreenProps) {
  const [weeks, setWeeks] = useState<CalendarDayInterface[][]>();

  useEffect(() => {
    if (period === "month") {
      const inWeeks = ArraySlice(days as CalendarDayInterface[], 7);
      setWeeks(inWeeks);
    }
  }, [days, period]);

  function showDays(week: CalendarDayInterface[]) {
    return week.map((d, i) => (
      <CalendarDay key={i} day={d} dateTime={dateTime} />
    ));
  }

  return (
    <div className="h-full">
      <div className="grid grid-cols-7 h-10">
        {Weekdays.map((weekday, i) => (
          <CalendarWeekTitle key={i} weekday={weekday} />
        ))}
      </div>
      {period === "month" && weeks ? (
        weeks.map((week, i) => (
          <div
            key={i}
            className={`${styles.rowHeightMonth} grid grid-cols-7 border-l border-gray-300 bg-white`}
          >
            {showDays(week)}
          </div>
        ))
      ) : (
        <div
          className={`${styles.rowHeightWeek} grid grid-cols-7 border-l border-gray-300 bg-white`}
        >
          {showDays(days)}
        </div>
      )}
    </div>
  );
}

export default CalendarScreen;
