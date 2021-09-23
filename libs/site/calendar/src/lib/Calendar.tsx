import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Alert, EventNewModal, Header } from "@iustitia/site/shared-components";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { getAllContacts, ModuleInterface as ContactInterface} from "@iustitia/site/contacts";
import {
  getDaysToShow,
  WARNING_TYPES,
} from "@iustitia/site/shared-utils";
import { CalendarHeader, CalendarPeriod, CalendarScreen } from "..";
import * as Services from "./services";
import styles from "./Calendar.module.css";

export const ModuleName = {
  module: "calendar",
  parents: ["Agenda"],
  singular: "Calendário",
  route: Routes.Calendar,
};

export interface ModuleInterface {
  id: string;
  startDate: Date;
  endDate: Date;
  fullDay: boolean;
  color: string;
  title: string;
  description: string;
  tenantId: string;
}

export type CalendarDayInterface = {
  day: DateTime;
  events: ModuleInterface[];
};

export type PeriodType = "month" | "week";

export function Calendar() {
  const initial = DateTime.now();
  const [dateTime, setDateTime] = useState<DateTime>(initial);
  const [period, setPeriod] = useState<PeriodType>("month");
  const [days, setDays] = useState<CalendarDayInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEventModal, setEShowEventModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DateTime>();
  const [contacts, setContacts] = useState<ContactInterface[]>();


  useEffect(() => {
    if (error) setTimeout(() => setError(""), 3000);
  }, [error]);

  useEffect(() => {
    handleChangeDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateTime, period]);

  useEffect(() => {
    getContacts();
  }, [])

  async function handleChangeDays() {
    const daysToShow = getDaysToShow(dateTime, period);
    try {
      const data = (await Services.getAll()) as ModuleInterface[];
      const daysWithEvents = formatEvents(daysToShow, data);
      setDays(daysWithEvents);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      console.log(err);
    }
  }

  function formatEvents(daysToShow: DateTime[], events: ModuleInterface[]) {
    const daysToReturn: CalendarDayInterface[] = [];
    daysToShow.forEach((day) => {
      const arrayDay: ModuleInterface[] = [];
      const dayStart = day.startOf("day").toISODate();
      events.forEach((e) => {
        const eventStart = DateTime.fromJSDate(e.startDate)
          .startOf("day")
          .toISODate();
        const eventEnd = DateTime.fromJSDate(e.endDate)
          .startOf("day")
          .toISODate();
        if (eventStart === dayStart) arrayDay.push(e);
        if (eventEnd === dayStart) arrayDay.push(e);
        if (eventStart < dayStart && eventEnd > dayStart) arrayDay.push(e);
      });
      const uniqEvents = [...new Set(arrayDay)];
      uniqEvents.sort((a, b) => a.startDate.getTime() - b.endDate.getTime());
      daysToReturn.push({ day, events: uniqEvents });
    });
    return daysToReturn;
  }

  function handleNewEvent(event: ModuleInterface) {
    console.log(event);
  }

  async function getContacts() {
    try {
      const data = await getAllContacts();
      console.log(data)
      setContacts(data as ContactInterface[]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      console.log(err);
    }
  }

  return (
    <>
      <div className="h-full">
        <Header before={ModuleName.parents} main={ModuleName.singular} />
        <div className={`${styles.containerHeight} px-4`}>
          {error && <Alert type={WARNING_TYPES.ERROR} message={error} />}
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
            <CalendarScreen
              period={period}
              dateTime={dateTime}
              days={days}
              setShowEventModal={setEShowEventModal}
              setSelectedDay={setSelectedDay}
            />
          </div>
        </div>
      </div>
      {showEventModal && (
        <EventNewModal
          day={selectedDay}
          setShowModal={setEShowEventModal}
          action={handleNewEvent}
          // contacts={contacts}
        />
      )}
    </>
  );
}

export default Calendar;
