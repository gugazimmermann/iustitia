import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../../context";
import { MenuItemInterface } from "@iustitia/modules";
import {
  BusinessContactsIcon,
  DashboardIcon,
  FinancialIcon,
  MembersIcon,
  MenuArrowIcon,
  PlacesIcon,
  ScheduleIcon,
} from "@iustitia/site/icons";
import { MenuLink } from "..";

interface MenuItemProps {
  item: MenuItemInterface;
}

export function MenuItem({ item }: MenuItemProps) {
  const { name, icon, route, subItems } = item;
  const { state } = useContext(MenuContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(route === state.activeMenu);
  }, [state]);

  function menuIcons(icon: string): JSX.Element {
    switch (icon) {
      case "DashboardIcon": {
        return <DashboardIcon styles="w-6 h-6" stroke={2} />;
      }
      case "PlacesIcon": {
        return <PlacesIcon styles="w-6 h-6" stroke={2} />;
      }
      case "MembersIcon": {
        return <MembersIcon styles="w-6 h-6" stroke={2} />;
      }
      case "BusinessContactsIcon": {
        return <BusinessContactsIcon styles="w-6 h-6" stroke={2} />;
      }
      case "ScheduleIcon": {
        return <ScheduleIcon styles="w-6 h-6" stroke={2} />;
      }
      case "FinancialIcon": {
        return <FinancialIcon styles="w-6 h-6" stroke={2} />;
      }
      default: {
        return <DashboardIcon styles="w-6 h-6" stroke={2} />;
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
        {menuIcons(icon)}
        <span className="ml-2 text-sm">{name}</span>
        <span className="ml-auto">
          <MenuArrowIcon
            styles="w-4 h-4 transition-transform transform"
            active={active}
          />
        </span>
      </div>
      <div className={`px-7 ${!active && `hidden`}`}>
        {subItems.map((subitem, i) => (
          <MenuLink key={i} subitem={subitem} />
        ))}
      </div>
    </>
  );
}

export default MenuItem;
