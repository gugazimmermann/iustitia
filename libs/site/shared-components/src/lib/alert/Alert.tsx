import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { useEffect } from "react";

export interface AlertInterface {
  show: boolean;
  type?: WARNING_TYPES;
  message: string;
  time?: number;
}

interface AlertSuccessProps {
  alert: AlertInterface;
  setAlert?(alert: AlertInterface): void;
}

export const DefaultAlert = {
  show: false,
  message: "",
  type: WARNING_TYPES.NONE,
  time: 3000,
}

export function Alert({ alert, setAlert }: AlertSuccessProps) {
  const { message, type, time } = alert;
  useEffect(() => {
    if (time && setAlert)
      setTimeout(() => setAlert({ ...alert, show: false }), time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const text = !type
    ? `text-primary-700`
    : type === WARNING_TYPES.SUCCESS
    ? `text-green-700`
    : type === WARNING_TYPES.WARNING
    ? `text-secondary-700`
    : type === WARNING_TYPES.ERROR
    ? `text-red-700`
    : `text-blue-700`; // WARNING_TYPES.INFO

  const bg = !type
    ? `bg-primary-100`
    : type === WARNING_TYPES.SUCCESS
    ? `bg-green-100`
    : type === WARNING_TYPES.WARNING
    ? `bg-secondary-100`
    : type === WARNING_TYPES.ERROR
    ? `bg-red-100`
    : `bg-blue-100`; // WARNING_TYPES.INFO

  const border = !type
    ? `border-primary-500`
    : type === WARNING_TYPES.SUCCESS
    ? `border-green-500`
    : type === WARNING_TYPES.WARNING
    ? `border-secondary-500`
    : type === WARNING_TYPES.ERROR
    ? `border-red-500`
    : `border-blue-500`; // WARNING_TYPES.INFO
  return (
    <div
      className={`relative border-t-4 rounded-b p-2 mb-2 shadow-md ${bg} ${border} ${text}`}
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className={`fill-current h-6 w-6 mr-4 ${text}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          <p className="font-bold py-1">{message}</p>
          {setAlert && (
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setAlert({ ...alert, show: false })}
            >
              <svg
                className={`fill-current h-6 w-6 ${text}`}
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alert;
