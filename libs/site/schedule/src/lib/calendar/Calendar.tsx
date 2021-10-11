import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import {
  Alert,
  AlertInterface,
  EventNewModal,
  Header,
} from "@iustitia/site/shared-components";
import { getDaysToShow, WARNING_TYPES } from "@iustitia/site/shared-utils";
import {
  MembersServices,
  ScheduleServices,
} from "@iustitia/site/services";
import {
  GetModule,
  ModulesEnum,
  ModulesInterface,
} from "@iustitia/modules";
import { CalendarHeader, CalendarPeriod, CalendarScreen } from "./components";
import styles from "./Calendar.module.css";

const scheduleModule = GetModule(ModulesEnum.schedule) as ModulesInterface;

type ScheduleEventsType = ScheduleServices.ScheduleEventsRes;
type MembersSimpleType = MembersServices.MembersSimpleRes;

export type CalendarDayInterface = {
  day: DateTime;
  events: ScheduleEventsType[];
};

export type PeriodType = "month" | "week";

export function Calendar() {
  const initial = DateTime.now();
  const [dateTime, setDateTime] = useState<DateTime>(initial);
  const [period, setPeriod] = useState<PeriodType>("month");
  const [days, setDays] = useState<CalendarDayInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: "",
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const [showEventModal, setEShowEventModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DateTime>();
  const [contacts, setContacts] = useState<MembersSimpleType[]>([]);

  useEffect(() => {
    handleChangeDays();
  }, [dateTime, period]);

  useEffect(() => {
    getContacts();
  }, []);

  async function handleChangeDays() {
    const daysToShow = getDaysToShow(dateTime, period);
    try {
      const data = (await ScheduleServices.getAllEvents({
        placeId: undefined,
      })) as ScheduleEventsType[];
      const daysWithEvents = formatEvents(daysToShow, data);
      setDays(daysWithEvents);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.NONE,
        time: 3000,
      });
      console.log(err);
    }
  }

  function formatEvents(daysToShow: DateTime[], events: ScheduleEventsType[]) {
    const daysToReturn: CalendarDayInterface[] = [];
    daysToShow.forEach((day) => {
      const arrayDay: ScheduleEventsType[] = [];
      const dayStart = day.startOf("day").toISODate();
      events.forEach((e) => {
        const eventStart = DateTime.fromJSDate(e.startDate as Date)
          .startOf("day")
          .toISODate();
        const eventEnd = DateTime.fromJSDate(e.endDate as Date)
          .startOf("day")
          .toISODate();
        if (eventStart === dayStart) arrayDay.push(e);
        if (eventEnd === dayStart) arrayDay.push(e);
        if (eventStart < dayStart && eventEnd > dayStart) arrayDay.push(e);
      });
      const uniqEvents = [...new Set(arrayDay)];
      uniqEvents.sort(
        (a, b) =>
          (a.startDate as Date).getTime() - (b.endDate as Date).getTime()
      );
      daysToReturn.push({ day, events: uniqEvents });
    });
    return daysToReturn;
  }

  function handleNewEvent(event: ScheduleEventsType) {
    console.log(event);
  }

  async function getContacts() {
    try {
      const data = await MembersServices.getAll();
      setContacts(data as MembersSimpleType[]);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.NONE,
        time: 3000,
      });
      console.log(err);
    }
  }

  return (
    <>
      <div className="h-full">
        <Header before={["Agenda"]} main={"Calendário"} />
        <div className={`${styles.containerHeight} px-4`}>
          {showAlert.show && (
            <Alert alert={showAlert} setAlert={setShowAlert} />
          )}
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
          contacts={contacts}
        />
      )}
    </>
  );
}

export default Calendar;
