import { MenuIcon } from "@iustitia/site/icons";

export interface NavMenuButtonProps {
  setMenuOpen(menuOpen: boolean): void;
  menuOpen: boolean;
}

export function NavMenuButton({ setMenuOpen, menuOpen }: NavMenuButtonProps) {
  return (
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className={`transition-colors duration-200 rounded-md text-primary-500 bg-primary-50 hover:text-grey-900 hover:bg-primary-100 focus:outline-none focus:ring ring-primary-300 ${menuOpen ? `hidden` : ``}`}
    >
      <MenuIcon styles="w-8 h-8" />
    </button>
  );
}

export default NavMenuButton;
