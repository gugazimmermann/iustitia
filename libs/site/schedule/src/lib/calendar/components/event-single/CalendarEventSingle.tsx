import { DateTime } from "luxon";
import { SeeEventBackgroundColor } from "@iustitia/site/shared-utils";
import { ScheduleServices } from "@iustitia/site/services";

type ScheduleEventsType = ScheduleServices.ScheduleEventsRes;

export interface CalendarEventSingleProps {
  event: ScheduleEventsType;
}

export function CalendarEventSingle({ event }: CalendarEventSingleProps) {
  return (
    <div className="flex items-start ml-1">
      <div
        className={`w-3 h-3 rounded ${SeeEventBackgroundColor(event.color as string)} `}
      />
      <div className="ml-1 text-xs truncate">
        {`${DateTime.fromJSDate(event.startDate as Date).toFormat("HH:mm")} ${
          event.title
        }`}
      </div>
    </div>
  );
}

export default CalendarEventSingle;
