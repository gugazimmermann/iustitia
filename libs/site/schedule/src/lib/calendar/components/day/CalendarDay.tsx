import { DateTime } from "luxon";
import { IsWeekend } from "@iustitia/site/shared-utils";
import { CalendarDayInterface } from "../../Calendar";
import { CalendarEventMulti, CalendarEventSingle } from "..";

export interface CalendarDayProps {
  day: CalendarDayInterface;
  dateTime: DateTime;
  setShowEventModal(eventModal: boolean): void;
  setSelectedDay(day: DateTime): void;
}

export function CalendarDay({ day, dateTime, setShowEventModal, setSelectedDay }: CalendarDayProps) {

  function handleOpenModal(day: DateTime) {
    setSelectedDay(day);
    setShowEventModal(true);
  }

  function seeEvent({ day, events }: CalendarDayInterface) {
    return events.map((event, i) => {
      const dateStart = DateTime.fromJSDate(event.startDate as Date);
      const dateEnd = DateTime.fromJSDate(event.endDate as Date);
      if (
        dateStart.startOf("day").toISODate() ===
        dateEnd.startOf("day").toISODate()
      ) {
        return <CalendarEventSingle key={i} event={event} />;
      } else {
        return (
          <CalendarEventMulti
            key={i}
            event={event}
            dateStart={dateStart}
            day={day}
          />
        );
      }
    });
  }

  return (
    <div
      className={`h-full cursor-pointer hover:bg-primary-50 border-r border-b border-gray-300 ${
        IsWeekend(day.day) && `bg-gray-50`
      }`}
      onClick={() => {
        handleOpenModal(day.day)
      }}
    >
      {day.day.ordinal === DateTime.now().ordinal ? (
        <span className=" ml-1 px-2 py-1 text-xs font-bold rounded-full text-white bg-primary-500">
          {day.day.toFormat("dd")}
        </span>
      ) : day.day.toFormat("MM") !== dateTime.toFormat("MM") ? (
        <span className=" ml-1 text-xs text-gray-400">
          {day.day.toFormat("dd")}
        </span>
      ) : (
        <span className=" ml-1 text-xs rounded-lg text-gray-900">
          {day.day.toFormat("dd")}
        </span>
      )}
      {seeEvent(day)}
    </div>
  );
}

export default CalendarDay;
