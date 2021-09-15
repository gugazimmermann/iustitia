import { ButtonMobileIcon } from "@iustitia/site/shared-components";

export interface NavMobileButtonProps {
  setNavOpen(navOpen: boolean): void;
  navOpen: boolean;
}

export function NavMobileButton({ setNavOpen, navOpen }: NavMobileButtonProps) {
  return (
    <button
      onClick={() => setNavOpen(!navOpen)}
      className="p-1 transition-colors duration-200 rounded-md text-primary-500 md:hidden focus:outline-none focus:ring ring-primary-300"
    >
      <span className="sr-only">Open sub manu</span>
      <span aria-hidden="true">
        <ButtonMobileIcon styles="w-8 h-8" />
      </span>
    </button>
  );
}

export default NavMobileButton;
