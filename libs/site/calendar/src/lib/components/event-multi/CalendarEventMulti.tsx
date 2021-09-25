import { DateTime } from "luxon";
import { SeeEventBackgroundColor, SeeEventTextColor } from "@iustitia/site/shared-utils";
import { CalendarService } from "@iustitia/site/services";
import { CalendarInterface } from "../../Calendar";
import styles from "../../Calendar.module.css";

export interface CalendarEventMultiProps {
  event: CalendarInterface;
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
      } relative px-2 py-1 pl-1 text-xs ${SeeEventBackgroundColor(event.color)} `}
    >
      {dateStart.toFormat("dd") === day.toFormat("dd") ? (
        <span className="text-white truncate">{event.title}</span>
      ) : (
        <span
          className={`truncate ${SeeEventTextColor(event.color)}`}
        >
          {event.title}
        </span>
      )}
    </div>
  );
}

export default CalendarEventMulti;
