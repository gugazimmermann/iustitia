import { DateTime } from "luxon";
import { MenuArrowIcon } from "@iustitia/site/shared-components";
import { firstUppercase } from "@iustitia/site/shared-utils";
import { CalendarDayInterface, PeriodType } from "../../Calendar";

export interface CalendarHeaderProps {
  firstDay: CalendarDayInterface;
  lastDay: CalendarDayInterface;
  period: PeriodType;
  dateTime: DateTime;
  setDateTime(dateTime: DateTime): void;
}

export function CalendarHeader({
  firstDay,
  lastDay,
  period,
  dateTime,
  setDateTime,
}: CalendarHeaderProps) {
  const periodObj = period === "month" ? { months: 1 } : { weeks: 1 };

  function title() {
    if (firstDay?.day && lastDay?.day) {
      const firstMonth = firstUppercase(firstDay.day.toFormat("MMMM"));
      const firstYear = firstDay.day.toFormat("yy");
      const lastMonth = firstUppercase(lastDay.day.toFormat("MMMM"));
      const lastYear = lastDay.day.toFormat("yy");
      const abrFirstMonth = firstUppercase(
        firstDay.day.toFormat("MMM")
      ).replace(".", "");
      const abrLastMonth = firstUppercase(lastDay.day.toFormat("MMM")).replace(
        ".",
        ""
      );
      if (period === "month") {
        return `${firstUppercase(
          dateTime.toFormat("MMMM")
        )} de ${dateTime.toFormat("yyyy")}`;
      }
      if (firstMonth === lastMonth) {
        return `${firstMonth} de ${firstDay.day.toFormat("yyyy")}`;
      }
      if (firstMonth !== lastMonth && firstYear === lastYear) {
        return `${abrFirstMonth} - ${abrLastMonth} de ${firstDay.day.toFormat(
          "yyyy"
        )}`;
      }
      if (firstMonth !== lastMonth && firstYear !== lastYear) {
        return `${abrFirstMonth} de ${firstYear} - ${abrLastMonth} de ${lastYear}`;
      }
    }
    return "";
  }

  return (
    <div className="flex items-center justify-center space-x-6">
      <button onClick={() => setDateTime(DateTime.now())}>
        <h4 className="uppercase">Hoje</h4>
      </button>
      <button
        className="underline"
        onClick={() => setDateTime(dateTime.minus(periodObj))}
      >
        <MenuArrowIcon styles="w-4 h-4 transform rotate-90" stroke={4} />
      </button>
      <h4>{title()}</h4>
      <button
        className="underline"
        onClick={() => setDateTime(dateTime.plus(periodObj))}
      >
        <MenuArrowIcon styles="w-4 h-4 transform rotate-270" stroke={4} />
      </button>
    </div>
  );
}
