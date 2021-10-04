import { ProfilesInterface } from "@iustitia/interfaces";
import { GetComponentMenu } from "@iustitia/components";
import { MenuFooter, MenuItem, MenuTitle } from ".";

interface MenuProps {
  profile: ProfilesInterface;
  offices: number;
  setMenuOpen(menuOpen: boolean): void;
  menuOpen: boolean;
}

export function Menu({ profile, offices, setMenuOpen, menuOpen }: MenuProps) {
  return (
    <aside
      className={`flex-shrink-0 w-64 bg-white ${
        !menuOpen ? `hidden` : `md:block`
      }`}
    >
      <div className="flex flex-col h-full">
        <MenuTitle setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

        <nav className="flex-1 px-2 pt-2 overflow-y-hidden hover:overflow-y-auto border-r">
          {profile.zip &&
            offices > 0 &&
            GetComponentMenu().map((item, i) => <MenuItem key={i} item={item} />)}
        </nav>

        <MenuFooter />
      </div>
    </aside>
  );
}

export default Menu;
