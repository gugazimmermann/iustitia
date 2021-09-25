import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Alert, EventNewModal, Header } from "@iustitia/site/shared-components";
import {
  getDaysToShow,
  WARNING_TYPES,
} from "@iustitia/site/shared-utils";
import { CalendarHeader, CalendarPeriod, CalendarScreen } from "./components";
import { CalendarService, ContactServices } from "@iustitia/site/services";
import styles from "./Calendar.module.css";

const { singular, parents } = ContactServices.ContactModule;
export type CalendarInterface = CalendarService.CalendarInterface;
type ContactInterface = ContactServices.ContactInterface;


export type CalendarDayInterface = {
  day: DateTime;
  events: CalendarInterface[];
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
      const data = (await CalendarService.getAll()) as CalendarInterface[];
      const daysWithEvents = formatEvents(daysToShow, data);
      setDays(daysWithEvents);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      console.log(err);
    }
  }

  function formatEvents(daysToShow: DateTime[], events: CalendarInterface[]) {
    const daysToReturn: CalendarDayInterface[] = [];
    daysToShow.forEach((day) => {
      const arrayDay: CalendarInterface[] = [];
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

  function handleNewEvent(event: CalendarInterface) {
    console.log(event);
  }

  async function getContacts() {
    try {
      const data = await ContactServices.getAll();
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
        <Header before={parents} main={singular} />
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
