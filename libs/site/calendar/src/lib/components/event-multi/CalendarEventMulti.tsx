import { DateTime } from "luxon";
import { EventsInterface } from "../../Calendar";
import styles from "../../Calendar.module.css";
import { CalendarEventBackGround } from "../../utils";

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
      className={`${
        styles.fullEvent
      } relative px-2 py-1 pl-1 text-xs ${CalendarEventBackGround(
        event.color
      )} `}
    >
      {dateStart.toFormat("dd") === day.toFormat("dd") ? (
        <span className="text-white truncate">{event.title}</span>
      ) : (
        <span
          className={`truncate ${CalendarEventBackGround(event.color).replace(
            "bg",
            "text"
          )} `}
        >
          {event.title}
        </span>
      )}
    </div>
  );
}

export default CalendarEventMulti;
