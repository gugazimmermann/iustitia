import { DateTime } from "luxon";
import { SeeEventBackgroundColor, SeeEventTextColor } from "@iustitia/site/shared-utils";
import styles from "../../Calendar.module.css";
import { ScheduleServices } from "@iustitia/site/services";

type ScheduleEventsType = ScheduleServices.ScheduleEventsRes;

export interface CalendarEventMultiProps {
  event: ScheduleEventsType;
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
      } relative px-2 py-1 pl-1 text-xs ${SeeEventBackgroundColor(event.color as string)} `}
    >
      {dateStart.toFormat("dd") === day.toFormat("dd") ? (
        <span className="text-white truncate">{event.title}</span>
      ) : (
        <span
          className={`truncate ${SeeEventTextColor(event.color as string)}`}
        >
          {event.title}
        </span>
      )}
    </div>
  );
}

export default CalendarEventMulti;
