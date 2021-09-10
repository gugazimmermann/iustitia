import { MenuFooter, MENUICONS, MenuItem, MenuTitle } from ".";

export interface MenuProps {
  setMenuOpen(menuOpen: boolean): void;
  menuOpen: boolean;
}

export function Menu({ setMenuOpen, menuOpen }: MenuProps) {
  return (
    <aside
      className={`flex-shrink-0 w-64 bg-white ${
        !menuOpen ? `hidden` : `md:block`
      }`}
    >
      <div className="flex flex-col h-full">
        <MenuTitle setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

        <nav className="flex-1 px-2 pt-2 overflow-y-hidden hover:overflow-y-auto border-r">
          <MenuItem
            item="Dashboards"
            icon={MENUICONS.DASHBOARD}
            subitems={["Escritório", "Processos"]}
          />
          <MenuItem
            item="Processos"
            icon={MENUICONS.DOCUMENT}
            subitems={["Listagem", "Cadastrar"]}
          />
        </nav>
        <MenuFooter />
      </div>
    </aside>
  );
}

export default Menu;
