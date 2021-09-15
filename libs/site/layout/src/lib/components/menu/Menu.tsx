import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { DashboardIcon, ScheduleIcon } from "@iustitia/site/shared-components";
import { MenuFooter, MenuItem, MenuTitle } from ".";

interface MenuProps {
  setMenuOpen(menuOpen: boolean): void;
  menuOpen: boolean;
}

export interface MenuItemInterface {
  name: string;
  icon: JSX.Element;
  subItems: MenuSubItemInterface[];
}

export interface MenuSubItemInterface {
  name: string;
  link: string;
}

export function Menu({ setMenuOpen, menuOpen }: MenuProps) {
  const menuItems: MenuItemInterface[] = [
    {
      name: "Dashboards",
      icon: <DashboardIcon styles="w-5 h-5" />,
      subItems: [
        {
          name: "Escritórios",
          link: `${Routes.Dashboard}`,
        },
        {
          name: "Processos",
          link: `${Routes.DashboardProcessos}`,
        },
      ],
    },
    {
      name: "Agenda",
      icon: <ScheduleIcon styles="w-5 h-5" />,
      subItems: [
        {
          name: "Agenda",
          link: `${Routes.Schedule}`,
        },
        {
          name: "Contatos",
          link: `${Routes.Contacts}`,
        },
        {
          name: "Calendário",
          link: `${Routes.Calendar}`,
        },
      ],
    },
  ];

  return (
    <aside
      className={`flex-shrink-0 w-64 bg-white ${
        !menuOpen ? `hidden` : `md:block`
      }`}
    >
      <div className="flex flex-col h-full">
        <MenuTitle setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

        <nav className="flex-1 px-2 pt-2 overflow-y-hidden hover:overflow-y-auto border-r">
          {menuItems.map((item, i) => (
            <MenuItem key={i} item={item} />
          ))}
        </nav>
        <MenuFooter />
      </div>
    </aside>
  );
}

export default Menu;
