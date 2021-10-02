import { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import { firstUppercase, getDaysToShow, Weekdays } from "@iustitia/site/shared-utils";
import { MenuArrowIcon } from "@iustitia/site/icons";

export interface CalendarDayInputProps {
  start?: DateTime;
  day: DateTime;
  action(selectedStartDay: DateTime): void;
  open: boolean;
  setOpen(open: boolean): void;
}

export function CalendarDayInput({
  start,
  day,
  action,
  open,
  setOpen,
}: CalendarDayInputProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [startDay, setStartDay] = useState<DateTime>();
  const [currentMonth, setCurrentMonth] = useState<DateTime>();
  const [days, setDays] = useState<DateTime[]>();

  useEffect(() => {
    day && setCurrentMonth(day)
  }, [day]);
  useEffect(
    () => currentMonth && setDays(getDaysToShow(currentMonth, "month")),
    [currentMonth]
  );
  useEffect(() => {
    start && setStartDay(start);
  }, [start]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkIfClickedOutside = (e: { target: any }) => {
      if (open && divRef.current && !divRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div
      ref={divRef}
      className="z-10 absolute top-0 left-0 p-4 mt-12 bg-white rounded-lg shadow"
      style={{ width: "17rem" }}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-lg font-bold text-gray-800">
            {currentMonth &&
              firstUppercase(currentMonth.toFormat("MMMM") as string)}
          </span>
          <span className="ml-1 text-lg font-normal text-gray-600">
            {currentMonth?.toFormat("yyyy")}
          </span>
        </div>
        <div>
          <button
            type="button"
            className="inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline hover:bg-gray-100"
            onClick={() =>
              setCurrentMonth(
                currentMonth?.startOf("month").minus({ months: 1 })
              )
            }
          >
            <MenuArrowIcon
              styles="inline-flex w-6 h-6 text-gray-400 transform rotate-90"
              stroke={2}
            />
          </button>
          <button
            type="button"
            className="inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline hover:bg-gray-100"
            onClick={() =>
              setCurrentMonth(
                currentMonth?.startOf("month").plus({ months: 1 })
              )
            }
          >
            <MenuArrowIcon
              styles="inline-flex w-6 h-6 text-gray-400 transform rotate-270"
              stroke={2}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap mb-3 -mx-1">
        {Weekdays.map((weekday, i) => (
          <div key={i} style={{ width: "14.26%" }} className="px-0.5">
            <div className="text-xs font-medium text-center text-gray-800">
              {weekday.substring(0, 3)}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap -mx-1">
        {days &&
          days.map((d, i) => (
            <div key={i} style={{ width: "14.26%" }} className="p-0.5">
              {d.toFormat("dd/MM/yyyy") === day?.toFormat("dd/MM/yyyy") ? (
                <button
                  type="button"
                  className="text-xs font-medium text-center rounded-full p-1 text-white bg-primary-500"
                  onClick={(e) => action(d)}
                >
                  {d.toFormat("dd")}
                </button>
              ) : d.toFormat("MM") !== currentMonth?.toFormat("MM") ? (
                <span className="p-1 text-white">00</span>
              ) : d.toISODate() < (startDay as DateTime).toISODate() ? (
                <span className="text-xs font-medium text-center rounded-full p-1 text-gray-400 line-through"> {d.toFormat("dd")}</span>
              ) : (
                <button
                  type="button"
                  className="text-xs font-medium text-center rounded-full p-1 text-gray-900 hover:bg-secondary-300"
                  onClick={(e) => action(d)}
                >
                  <span className="">{d.toFormat("dd")}</span>
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CalendarDayInput;
