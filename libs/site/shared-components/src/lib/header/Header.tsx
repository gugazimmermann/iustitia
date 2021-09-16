import { Breadcrumb } from "../..";

export interface HeaderProps {
  before: string[];
  main: string;
  button?: (state: boolean) => JSX.Element;
  back?: boolean;
  select?: () => JSX.Element;
  hide?: boolean;
}

export function Header({ before, main, button, back, select, hide }: HeaderProps) {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b lg:py-4">
      <Breadcrumb before={before} main={main} hide={hide} />
      {button && button(back as boolean)}
      {select && select()}
    </div>
  );
}

export default Header;
