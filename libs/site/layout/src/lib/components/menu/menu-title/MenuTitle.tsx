import { Link } from "react-router-dom";
import { SiteRoutes } from "@iustitia/react-routes";
import { MenuArrowIcon } from "@iustitia/site/shared-components";

export interface MenuTitleProps {
  setMenuOpen(menuOpen: boolean): void;
  menuOpen: boolean;
}

export function MenuTitle({ setMenuOpen, menuOpen }: MenuTitleProps) {
  return (
    <div className="border-b h-14 flex items-center">
      <Link
        to={SiteRoutes.Dashboard}
        className="text-3xl text-center font-bold tracking-wider text-primary-900 flex-grow"
      >
        {process.env.NX_APP_TITLE}
      </Link>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-min pb-4 pt-4 pl-4"
      >
        <MenuArrowIcon
          styles="w-4 h-4 rotate-90 transition-transform transform"
          active={false}
        />
      </button>
    </div>
  );
}

export default MenuTitle;
