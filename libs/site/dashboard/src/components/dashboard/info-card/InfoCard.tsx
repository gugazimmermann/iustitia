import {
  CaseIcon,
  GraphDownIcon,
  GraphUpIcon,
  MoneyIcon,
  PeopleIcon,
} from "../../../icons";

export enum INFOCARDSICONS {
  MONEY = "money",
  PEOPLE = "people",
  GRAPH_UP = "graph_up",
  GRAPH_DOWN = "graph_down",
  CASE = "case",
}

export interface InfoCardProps {
  title: string;
  content: string;
  badge: string;
  badgeColor: string;
  icon: INFOCARDSICONS;
}

export function InfoCard({
  title,
  content,
  badge,
  badgeColor,
  icon,
}: InfoCardProps) {
  function showIcon(icon: INFOCARDSICONS) {
    const iconStyle = "w-12 h-12 text-purple-400";
    switch (icon) {
      case INFOCARDSICONS.MONEY: {
        return <MoneyIcon styles={iconStyle} stroke={1} />;
      }
      case INFOCARDSICONS.PEOPLE: {
        return <PeopleIcon styles={iconStyle} stroke={1} />;
      }
      case INFOCARDSICONS.GRAPH_UP: {
        return <GraphUpIcon styles={iconStyle} stroke={1} />;
      }
      case INFOCARDSICONS.GRAPH_DOWN: {
        return <GraphDownIcon styles={iconStyle} stroke={1} />;
      }
      case INFOCARDSICONS.CASE: {
        return <CaseIcon styles={iconStyle} stroke={1} />;
      }
      default: {
        return null;
      }
    }
  }
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm">
      <div>
        <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
          {title}
        </h6>
        <span className="text-xl font-semibold">{content}</span>
        <span
          className={`inline-block px-2 py-px ml-2 text-xs text-${badgeColor}-500 bg-${badgeColor}-100 rounded-md`}
        >
          {badge}
        </span>
      </div>
      {showIcon(icon)}
    </div>
  );
}

export default InfoCard;
