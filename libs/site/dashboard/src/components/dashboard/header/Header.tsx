import Breadcrumb from "../breadcrumb/Breadcrumb";

export interface HeaderProps {
  before: string[];
  main: string;
  button?: (state: boolean) => JSX.Element;
  back?: boolean;
}

export function Header({ before, main, button, back }: HeaderProps) {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b lg:py-4">
      <Breadcrumb before={before} main={main} />
      {button && button(back as boolean)}
    </div>
  );
}

export default Header;
