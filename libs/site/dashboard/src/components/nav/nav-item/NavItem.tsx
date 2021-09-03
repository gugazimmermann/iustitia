import { NotificationIcon, SearchIcon, SettingsIcon } from "../../../icons";

export enum NAVICONS {
  NOTIFICATION = "notification",
  SEARCH = "search",
  SETTINGS = "settings",
}

export interface NavItemProps {
  item: string;
  icon: NAVICONS;
  alert: boolean;
  open?(openState: boolean): void;
  openState?: boolean;
}

export function NavItem({ item, icon, alert, open, openState }: NavItemProps) {
  function getIcon(icon: string) {
    const IconStyle = "w-7 h-7";

    switch (icon) {
      case NAVICONS.NOTIFICATION: {
        return <NotificationIcon styles={IconStyle} />;
      }
      case NAVICONS.SEARCH: {
        return <SearchIcon styles={IconStyle} />;
      }
      case NAVICONS.SETTINGS: {
        return <SettingsIcon styles={IconStyle} />;
      }
      default: {
        return <NotificationIcon styles={IconStyle} />;
      }
    }
  }

  return (
    <button
      onClick={() => (open ? open(!openState) : () => false)}
      className="p-2 relative transition-colors duration-200 rounded-full text-purple-500 bg-purple-50 hover:text-purple-900 hover:bg-purple-100 focus:outline-none focus:bg-purple-100 focus:ring-purple-900"
    >
      <span className="sr-only">Open {item}</span>
      {getIcon(icon)}
      {alert && (
        <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-yellow-500 border-2 border-white rounded-full"></span>
      )}
    </button>
  );
}

export default NavItem;
