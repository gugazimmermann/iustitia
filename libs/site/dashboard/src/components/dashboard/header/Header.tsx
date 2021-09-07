import Breadcrumb from "../breadcrumb/Breadcrumb";

export interface HeaderProps {
  before: string[];
  main: string;
}

export function Header({ before, main }: HeaderProps) {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b lg:py-4">
      {/* <h1 className="text-2xl font-semibold">Dashboard / Escritório</h1> */}
      <Breadcrumb before={before} main={main} />
      {/* TODO: receive a component */}
      <button className="px-4 py-2 text-sm text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-white">
        View on github
      </button>
    </div>
  );
}

export default Header;
