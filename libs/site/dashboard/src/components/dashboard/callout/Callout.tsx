import { Link } from "react-router-dom";
import { CalloutWarningIcon } from "../../../icons/CalloutWarningIcon";

export enum CALLOUTTYPES {
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
}

export interface CalloutProps {
  type?: CALLOUTTYPES;
  title: string;
  emphasis?: string;
  content?: string;
}

export function Callout({
  type,
  title,
  emphasis,
  content,
}: CalloutProps) {
  const text = !type
    ? `text-primary-500`
    : type === CALLOUTTYPES.WARNING
    ? `text-secondary-500`
    : type === CALLOUTTYPES.ERROR
    ? `text-red-500`
    : `text-blue-500`;

  const bg = !type
    ? `bg-primary-300`
    : type === CALLOUTTYPES.WARNING
    ? `bg-secondary-300`
    : type === CALLOUTTYPES.ERROR
    ? `bg-red-300`
    : `bg-blue-300`;

  const border = !type
    ? `border-primary-500`
    : type === CALLOUTTYPES.WARNING
    ? `border-secondary-500`
    : type === CALLOUTTYPES.ERROR
    ? `border-red-500`
    : `border-blue-500`;

  return (
    <div className="m-2 relative flex flex-wrap sm:flex-no-wrap justify-between bg-white rounded p-2 space-x-0 sm:space-x-2 shadow-md">
      <div className={`absolute inset-0 border-l-4 ${border}`}></div>
      <div className="flex space-x-4">
        {type && (
          <div className="flex flex-1 sm:flex-initial justify-center items-baseline py-4 sm:py-0">
            <span className={`bg-opacity-50 rounded-full p-1 ${bg}`}>
              <CalloutWarningIcon styles={`w-auto ${text}`} />
            </span>
          </div>
        )}
        <div className="flex flex-col flex-grow text-center sm:text-left">
          <h1 className="font-medium leading-relaxed sm:leading-normal">
            {title} {emphasis && <strong className={text}>{emphasis}</strong>}
          </h1>
          <p className="leading-tight text-xs md:text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Callout;
