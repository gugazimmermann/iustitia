import { MenuArrowIcon } from "../../../icons";

export interface MenuTitleProps {
  setMenuOpen(menuOpen: boolean): void;
  menuOpen: boolean;
}


export function MenuTitle({ setMenuOpen, menuOpen }: MenuTitleProps) {
  return (
    <div className="border-b h-14 flex items-center">
      <h1 className="text-3xl text-center font-bold tracking-wider text-primary-900 flex-grow">
        {process.env.NX_APP_TITLE}
      </h1>
      <button onClick={() => setMenuOpen(!menuOpen)} className="w-min pb-4 pt-4 pl-4">
        <MenuArrowIcon
          styles="w-4 h-4 rotate-90 transition-transform transform"
          active={false}
        />
      </button>
    </div>
  );
}

export default MenuTitle;
