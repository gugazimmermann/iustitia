import { Link } from "react-router-dom";
import { MenuSubItemInterface } from "..";

interface MenuItemProps {
  subitem: MenuSubItemInterface;
}
export function MenuLink({ subitem }: MenuItemProps) {
  const { name, link } = subitem;
  return (
    <div className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md hover:text-gray-700">
      <Link to={link}>{name}</Link>
    </div>
  );
}

export default MenuLink;
