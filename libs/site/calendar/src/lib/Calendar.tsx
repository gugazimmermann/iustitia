import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Header } from "@iustitia/site/shared-components";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import DaysToShow from "./utils/DaysToShow";
import {
  CalendarHeader,
  CalendarPeriod,
  CalendarScreen
} from "..";
import styles from "./Calendar.module.css"

const eventos: EventsInterface[] = [
  {
    dateStart: DateTime.fromFormat(
      "2021-08-30 15:15",
      "yyyy-MM-dd HH:mm"
    ).toJSDate(),
    dateEnd: DateTime.fromFormat(
      "2021-08-30 18:00",
      "yyyy-MM-dd HH:mm"
    ).toJSDate(),
    fullDay: false,
    title: "Teste",
    color: "green",
  },
  {
    dateStart: DateTime.fromFormat(
      "2021-09-08 20:00",
      "yyyy-MM-dd HH:mm"
    ).toJSDate(),
    dateEnd: DateTime.fromFormat(
      "2021-09-08 23:59",
      "yyyy-MM-dd HH:mm"
    ).toJSDate(),
    fullDay: false,
    title: "Jantar",
    color: "orange",
  },
  {
    dateStart: DateTime.fromFormat(
      "2021-09-08 10:45",
      "yyyy-MM-dd HH:mm"
    ).toJSDate(),
    dateEnd: DateTime.fromFormat(
      "2021-09-08 11:45",
      "yyyy-MM-dd HH:mm"
    ).toJSDate(),
    fullDay: false,
    title: "Consulta Dentista",
    color: "orange",
  },
  {
    dateStart: DateTime.fromFormat(
      "2021-09-24 00:00",
      "yyyy-MM-dd HH:mm"
    ).toJSDate(),
    dateEnd: DateTime.fromFormat(
      "2021-09-28 00:00",
      "yyyy-MM-dd HH:mm"
    ).toJSDate(),
    fullDay: true,
    title: "Fora do Escritorio",
    color: "purple",
  },
  {
    dateStart: DateTime.fromFormat(
      "2021-10-15 00:00",
      "yyyy-MM-dd HH:mm"
    ).toJSDate(),
    dateEnd: DateTime.fromFormat(
      "2021-10-15 00:00",
      "yyyy-MM-dd HH:mm"
    ).toJSDate(),
    fullDay: true,
    title: "Reuniao Sistema",
    color: "green",
  },
];

function getEventsFromDB() {
  return eventos;
}

export type CalendarDayInterface = {
  day: DateTime;
  events: EventsInterface[];
};
export interface EventsInterface {
  dateStart: Date;
  dateEnd: Date;
  fullDay: boolean;
  title: string;
  color: "orange" | "purple" | "green";
}

export type PeriodType = "month" | "week";

export const ModuleName = {
  module: "calendar",
  parents: ["Agenda"],
  singular: "Calendário",
  route: Routes.Calendar,
};

export function Calendar() {
  const initial = DateTime.now();
  const [dateTime, setDateTime] = useState<DateTime>(initial);
  const [period, setPeriod] = useState<PeriodType>("month");
  const [days, setDays] = useState<CalendarDayInterface[]>([]);

  useEffect(() => {
    function handleChangeDays() {
      const daysToShow = DaysToShow(dateTime, period);
      const events = handleGetEvents();
      const daysWithEvents = formatEvents(daysToShow, events);
      setDays(daysWithEvents);
    }

    handleChangeDays();
  }, [dateTime, period]);

  function handleGetEvents() {
    const events = getEventsFromDB();
    return events;
  }

  function formatEvents(daysToShow: DateTime[], events: EventsInterface[]) {
    const daysToReturn: CalendarDayInterface[] = [];
    daysToShow.forEach((day) => {
      const arrayDay: EventsInterface[] = [];
      const dayStart = day.startOf("day").toISODate();
      events.forEach((e) => {
        const eventStart = DateTime.fromJSDate(e.dateStart)
          .startOf("day")
          .toISODate();
        const eventEnd = DateTime.fromJSDate(e.dateEnd)
          .startOf("day")
          .toISODate();
        if (eventStart === dayStart) arrayDay.push(e);
        if (eventEnd === dayStart) arrayDay.push(e);
        if (eventStart < dayStart && eventEnd > dayStart) arrayDay.push(e);
      });
      const uniqEvents = [...new Set(arrayDay)];
      uniqEvents.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
      daysToReturn.push({ day, events: uniqEvents });
    });
    return daysToReturn;
  }

  return (
    <div className="h-full">
      <Header before={ModuleName.parents} main={ModuleName.singular} />
      <div className={`${styles.containerHeight} px-4`}>
        <div className="flex justify-between h-10">
          <CalendarHeader
            firstDay={days[0]}
            lastDay={days[days.length - 1]}
            period={period}
            dateTime={dateTime}
            setDateTime={setDateTime}
          />
          <CalendarPeriod period={period} setPeriod={setPeriod} />
        </div>
        <div className={`${styles.mainHeight}`}>
            <CalendarScreen period={period} dateTime={dateTime} days={days} />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
