export interface BreadcrumbProps {
  before: string[];
  main: string;
  hide?: boolean;
  select?: () => JSX.Element;
}

export function Breadcrumb({ before, main, hide, select }: BreadcrumbProps) {
  return (
    <div className="flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
      <div className="block md:inline-block">
        <ul className={`text-gray-500 text-sm ${hide ? `hidden` : `flex`}`}>
          {before.map((item, i) => (
            <li key={i} className="inline-flex items-center">
              <span>{item}</span>
              <svg
                className="h-5 w-auto text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </li>
          ))}
          <li className="inline-flex items-center">
            <span className="text-primary-500 text-lg">{main}</span>
          </li>
        </ul>
      </div>
      {select && select()}
    </div>
  );
}

export default Breadcrumb;
