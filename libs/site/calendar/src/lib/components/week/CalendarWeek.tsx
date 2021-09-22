import { DateTime } from "luxon";
import { CalendarDayInterface } from "../../Calendar";
import { IsWeekend, Weekdays } from "../../utils";
import styles from "../../Calendar.module.css"

export interface CalendarWeekProps {
  dateTime: DateTime;
  days: CalendarDayInterface[];
}

export function CalendarWeek({ dateTime, days }: CalendarWeekProps) {
  function seeEvent({ day, events }: CalendarDayInterface) {
    if (events.length) {
      return events.map((ev, i) => {
        const dateStart = DateTime.fromJSDate(ev.dateStart);
        const dateEnd = DateTime.fromJSDate(ev.dateEnd);
        if (
          dateStart.startOf("day").toISODate() ===
          dateEnd.startOf("day").toISODate()
        ) {
          return (
            <div key={i} className="flex items-start ml-1">
              <div
                className={`w-3 h-3 rounded ${
                  ev.color === "orange"
                    ? `bg-secondary-500`
                    : ev.color === "purple"
                    ? `bg-purple-500`
                    : ev.color === "green"
                    ? `bg-green-500`
                    : `bg-primary-500`
                } `}
              />
              <div className="ml-1 text-xs truncate">
                {`${DateTime.fromJSDate(ev.dateStart).toFormat("HH:mm")} ${
                  ev.title
                }`}
              </div>
            </div>
          );
        } else {
          return (
            <div
              className={`${styles.fullEvent} relative px-2 py-1 pl-1 text-xs ${
                ev.color === "orange"
                  ? `bg-secondary-500`
                  : ev.color === "purple"
                  ? `bg-purple-500`
                  : ev.color === "green"
                  ? `bg-green-500`
                  : `bg-primary-500`
              } `}
            >
              {dateStart.toFormat("dd") === day.toFormat("dd") ? (
                <span className="text-white truncate">{ev.title}</span>
              ) : (
                <span
                  className={`truncate ${
                    ev.color === "orange"
                      ? `text-secondary-500`
                      : ev.color === "purple"
                      ? `text-purple-500`
                      : ev.color === "green"
                      ? `text-green-500`
                      : `text-primary-500`
                  } `}
                >
                  {ev.title}
                </span>
              )}
            </div>
          );
        }
      });
    }
    return null;
  }

  function showWeekDays() {
    return Weekdays.map((weekday, i) => (
      <div
        key={i}
        className="flex text-xs uppercase items-center justify-center bg-primary-500 text-white"
      >
        <span className="xl:block lg:block md:block sm:block hidden">
          {weekday}
        </span>
        <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
          {weekday.substring(0, 3)}
        </span>
      </div>
    ));
  }

  function showDays() {
    return days.map((d, i) => (
      <div
        key={i}
        className={`h-full border-r border-b border-gray-300 ${
          IsWeekend(d.day) && `bg-secondary-50`
        }`}
      >
        {d.day.ordinal === DateTime.now().ordinal ? (
        <span className=" ml-1 px-2 py-1 text-xs font-bold rounded-full text-white bg-primary-500">
            {d.day.toFormat("dd")}
          </span>
        ) : d.day.toFormat("MM") !== dateTime.toFormat("MM") ? (
          <span className=" ml-1 text-xs text-gray-400">
            {d.day.toFormat("dd")}
          </span>
        ) : (
          <span className=" ml-1 text-xs rounded-lg text-gray-900">
            {d.day.toFormat("dd")}
          </span>
        )}
        {seeEvent(d)}
      </div>
    ));
  }

  return (
    <div className="h-full">
      <div className="grid grid-cols-7 h-10">{showWeekDays()}</div>
      <div className={`${styles.rowHeight} ${styles.rowHeightWeek} rowcss`}>
        {showDays()}
      </div>
    </div>
  );
}

export default CalendarWeek;
