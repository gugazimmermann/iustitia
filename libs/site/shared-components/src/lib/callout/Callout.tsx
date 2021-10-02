import { WarningIcon } from "@iustitia/site/icons";
import { warningTypes, WARNING_TYPES } from "@iustitia/site/shared-utils";

export interface CalloutProps {
  type?: WARNING_TYPES;
  title: string;
  emphasis?: string;
  content?: string;
}

export function Callout({ type, title, emphasis, content }: CalloutProps) {
  const { text, bg, border } = warningTypes(type ? type : WARNING_TYPES.NONE);

  return (
    <div className="container mx-auto m-2 relative flex flex-wrap sm:flex-no-wrap justify-between bg-white rounded p-2 space-x-0 sm:space-x-2 shadow-md">
      <div className={`absolute inset-0 border-l-4 ${border} rounded-sm`}></div>
      <div className="flex space-x-4 items-center ">
        {type && (
          <div className="flex flex-1 sm:flex-initial justify-center items-baseline py-4 sm:py-0">
            <span className={`bg-opacity-25 rounded-full p-1 ${bg}`}>
              <WarningIcon styles={`w-auto ${text}`} />
            </span>
          </div>
        )}
        <div className="flex flex-col flex-grow text-center sm:text-left">
          <h1 className="font-medium leading-relaxed sm:leading-normal">
            {title} {emphasis && <strong className={text}>{emphasis}</strong>}
          </h1>
          {content && (
            <p className="leading-tight text-xs md:text-sm">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Callout;
