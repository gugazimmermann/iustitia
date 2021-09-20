import { Breadcrumb } from "../..";

export interface HeaderProps {
  before: string[];
  main: string;
  button?: (state: boolean) => JSX.Element;
  back?: boolean;
  select?: () => JSX.Element;
  search?: () => JSX.Element;
  hide?: boolean;
}

export function Header({
  before,
  main,
  button,
  back,
  select,
  search,
  hide,
}: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-center justify-between w-full px-4 py-2 lg:py-4 border-b">
      <div className="md:space-x-4">
        <Breadcrumb before={before} main={main} hide={hide} select={select} />
        {select && select()}
      </div>
      {search && search()}
      {button && button(back as boolean)}
    </div>
  );
}

export default Header;
