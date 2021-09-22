import { DateTime } from "luxon";
import { EventsInterface } from "../../Calendar";
import { CalendarEventBackGround } from "../../utils";

export interface CalendarEventSingleProps {
  event: EventsInterface;
}

export function CalendarEventSingle({ event }: CalendarEventSingleProps) {
  return (
    <div className="flex items-start ml-1">
      <div
        className={`w-3 h-3 rounded ${CalendarEventBackGround(event.color)} `}
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
