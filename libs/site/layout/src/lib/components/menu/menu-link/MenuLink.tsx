import { NavLink } from "react-router-dom";
import { MenuSubItemInterface } from "@iustitia/site-modules";

interface MenuItemProps {
  subitem: MenuSubItemInterface;
}
export function MenuLink({ subitem }: MenuItemProps) {
  const { name, link } = subitem;
  return (
    <NavLink
      to={link}
      activeClassName="bg-primary-200 text-primary-500"
      className="w-full block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md hover:text-gray-700"
    >
      {name}
    </NavLink>
  );
}

export default MenuLink;
