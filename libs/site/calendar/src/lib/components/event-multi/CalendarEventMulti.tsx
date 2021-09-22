import { DateTime } from "luxon";
import { EventsInterface } from "../../Calendar";
import styles from "../../Calendar.module.css";

export interface CalendarEventMultiProps {
  event: EventsInterface;
  dateStart: DateTime;
  day: DateTime;
}

export function CalendarEventMulti({
  event,
  dateStart,
  day,
}: CalendarEventMultiProps) {
  return (
    <div
      className={`${styles.fullEvent} relative px-2 py-1 pl-1 text-xs ${
        event.color === "orange"
          ? `bg-secondary-500`
          : event.color === "purple"
          ? `bg-purple-500`
          : event.color === "green"
          ? `bg-green-500`
          : `bg-primary-500`
      } `}
    >
      {dateStart.toFormat("dd") === day.toFormat("dd") ? (
        <span className="text-white truncate">{event.title}</span>
      ) : (
        <span
          className={`truncate ${
            event.color === "orange"
              ? `text-secondary-500`
              : event.color === "purple"
              ? `text-purple-500`
              : event.color === "green"
              ? `text-green-500`
              : `text-primary-500`
          } `}
        >
          {event.title}
        </span>
      )}
    </div>
  );
}

export default CalendarEventMulti;
