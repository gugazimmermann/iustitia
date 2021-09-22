import { PeriodType } from "../../Calendar";

export interface CalendarPeriodProps {
  period: PeriodType;
  setPeriod(period: PeriodType): void;
}

export function CalendarPeriod({ period, setPeriod }: CalendarPeriodProps) {
  return (
    <div className="flex items-center space-x-6">
      <button onClick={() => setPeriod("month")}>
        <h4
          className={period === "month" ? `text-primary-500` : `text-gray-700`}
        >
          Mês
        </h4>
      </button>
      <button onClick={() => setPeriod("week")}>
        <h4
          className={period === "week" ? `text-primary-500` : `text-gray-700`}
        >
          Semana
        </h4>
      </button>
    </div>
  );
}

export default CalendarPeriod;
