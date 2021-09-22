export interface CalendarWeekTitleProps {
  weekday: string;
}

export function CalendarWeekTitle({ weekday }: CalendarWeekTitleProps) {
  return (
    <div className="flex text-xs uppercase items-center justify-center bg-primary-500 text-white">
      <span className="xl:block lg:block md:block sm:block hidden">
        {weekday.replace("-feira", "")}
      </span>
      <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
        {weekday.substring(0, 3)}
      </span>
    </div>
  );
}

export default CalendarWeekTitle;
