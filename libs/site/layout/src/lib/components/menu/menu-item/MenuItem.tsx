import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MenuArrowIcon } from "@iustitia/site/shared-components";
import { MenuItemInterface, MenuLink } from "..";

interface MenuItemProps {
  item: MenuItemInterface;
}

export function MenuItem({ item }: MenuItemProps) {
  const location = useLocation();
  const { icon, name, subItems } = item;
  const [active, setActive] = useState(false);

  useEffect(() => {
    const activePath = subItems.find((s) => s.link === location.pathname);
    if (activePath) setActive(true);
  }, [location, subItems]);

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
        {icon}
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
