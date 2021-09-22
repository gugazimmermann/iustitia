import { DateTime } from "luxon";
import { EventsInterface } from "../../Calendar";

export interface CalendarEventSingleProps {
  event: EventsInterface;
}

export function CalendarEventSingle({ event }: CalendarEventSingleProps) {
  return (
    <div className="flex items-start ml-1">
      <div
        className={`w-3 h-3 rounded ${
          event.color === "orange"
            ? `bg-secondary-500`
            : event.color === "purple"
            ? `bg-purple-500`
            : event.color === "green"
            ? `bg-green-500`
            : `bg-primary-500`
        } `}
      />
      <div className="ml-1 text-xs truncate">
        {`${DateTime.fromJSDate(event.dateStart).toFormat("HH:mm")} ${
          event.title
        }`}
      </div>
    </div>
  );
}

export default CalendarEventSingle;
