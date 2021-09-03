import { MenuIcon } from "../../../icons";

export interface NavMenuButtonProps {
  setMenuOpen(menuOpen: boolean): void;
  menuOpen: boolean;
}

export function NavMenuButton({ setMenuOpen, menuOpen }: NavMenuButtonProps) {
  return (
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className={`p-1 transition-colors duration-200 rounded-md text-purple-500 bg-purple-50 hover:text-grey-900 hover:bg-purple-100 focus:outline-none focus:ring ring-purple-300 ${menuOpen ? `hidden` : ``}`}
    >
      <MenuIcon styles="w-8 h-8" />
    </button>
  );
}

export default NavMenuButton;
