import { SeeEventBackgroundColor } from "@iustitia/site/shared-utils";
import { DateTime } from "luxon";
import { ModuleInterface } from "../../Calendar";

export interface CalendarEventSingleProps {
  event: ModuleInterface;
}

export function CalendarEventSingle({ event }: CalendarEventSingleProps) {
  return (
    <div className="flex items-start ml-1">
      <div
        className={`w-3 h-3 rounded ${SeeEventBackgroundColor(event.color)} `}
      />
      <div className="ml-1 text-xs truncate">
        {`${DateTime.fromJSDate(event.startDate).toFormat("HH:mm")} ${
          event.title
        }`}
      </div>
    </div>
  );
}

export default CalendarEventSingle;
