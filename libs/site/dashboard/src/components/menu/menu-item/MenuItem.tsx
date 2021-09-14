import { useState } from "react";
import { MenuLink } from "..";
import { DashboardIcon, DocumentIcon, MenuArrowIcon } from "@iustitia/site/shared-components";

export enum MENUICONS {
  DASHBOARD = "dashboard",
  DOCUMENT = "document",
}

export interface MenuItemProps {
  item: string;
  icon: MENUICONS;
  subitems: string[];
}

export function MenuItem({ item, icon, subitems }: MenuItemProps) {
  const [active, setActive] = useState(false);

  function getIcon(icon: string) {
    const IconStyle="w-5 h-5"
    switch (icon) {
      case MENUICONS.DASHBOARD: {
        return <DashboardIcon styles={IconStyle} />;
      }
      case MENUICONS.DOCUMENT: {
        return <DocumentIcon styles={IconStyle} />;
      }
      default: {
        return <DashboardIcon styles={IconStyle} />;
      }
    }
  }

  return (
    <>
      <div
        onClick={() => setActive(!active)}
        className={`flex items-center p-2 transition-colors rounded-md cursor-pointer ${
          active
            ? `rotate-180 text-white bg-primary-500`
            : `text-gray-900 hover:bg-primary-100`
        }`}
      >
        {getIcon(icon)}
        <span className="ml-2 text-sm">{item}</span>
        <span className="ml-auto">
          <MenuArrowIcon
            styles="w-4 h-4 transition-transform transform"
            active={active}
          />
        </span>
      </div>
      <div className={`px-7 ${!active && `hidden`}`}>
        {subitems.map((subitem, i) => (
          <MenuLink key={i} subitem={subitem} />
        ))}
      </div>
    </>
  );
}

export default MenuItem;
