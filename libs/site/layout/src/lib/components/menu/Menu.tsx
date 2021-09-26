import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { DashboardIcon, PeopleIcon, ScheduleIcon } from "@iustitia/site/shared-components";
import { ProfileInterface } from "../../Layout";
import { MenuFooter, MenuItem, MenuTitle } from ".";

interface MenuProps {
  profile?: ProfileInterface
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

export function Menu({ profile, setMenuOpen, menuOpen }: MenuProps) {

  const menuItems: MenuItemInterface[] = [{
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
  }];
  const adminItem: MenuItemInterface[] = [];
  const openItem: MenuItemInterface[] = [
    {
      name: "Pessoal",
      icon: <PeopleIcon styles="w-5 h-5" stroke={2} />,
      subItems: [
        {
          name: "Pessoas",
          link: `${Routes.People}`,
        },
        {
          name: "Permissões",
          link: `${Routes.Permissions}`,
        },
      ],
    },
    {
      name: "Agenda",
      icon: <ScheduleIcon styles="w-5 h-5" />,
      subItems: [
        {
          name: "Empresas",
          link: `${Routes.Companies}`,
        },
        {
          name: "Contatos",
          link: `${Routes.Contacts}`,
        },
        {
          name: "Agenda",
          link: `${Routes.Schedule}`,
        },
        {
          name: "Calendário",
          link: `${Routes.Calendar}`,
        },
      ],
    },
  ];

  if (profile?.role === "Administrador") {
    adminItem.forEach(i => menuItems.push(i))
  }
  openItem.forEach(i => menuItems.push(i))


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
