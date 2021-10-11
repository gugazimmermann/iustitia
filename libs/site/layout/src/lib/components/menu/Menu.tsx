import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GetMenu } from "@iustitia/modules";
import { ProfilesServices } from "@iustitia/site/services";
import { MenuContext } from "../../context";
import { MenuFooter, MenuItem, MenuTitle } from ".";

type ProfilesType = ProfilesServices.ProfilesRes;

interface MenuProps {
  profile: ProfilesType;
  places: number;
  setMenuOpen(menuOpen: boolean): void;
  menuOpen: boolean;
}

export function Menu({ profile, places, setMenuOpen, menuOpen }: MenuProps) {
  const { pathname } = useLocation();
  const { state, dispatch } = useContext(MenuContext);

  useEffect(() => {
    const activeMenu = pathname.split("/")[1];
    if (activeMenu) dispatch({ type: "UPDATE_MENU", payload: pathname.split("/")[1] });
  }, [pathname]);

  return (
    <aside
      className={`flex-shrink-0 w-64 bg-white ${
        !menuOpen ? `hidden` : `md:block`
      }`}
    >
      <div className="flex flex-col h-full">
        <MenuTitle setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

        <nav className="flex-1 px-2 pt-2 overflow-y-hidden hover:overflow-y-auto border-r">
          {GetMenu().map((item, i) => {
            if (item.name === "Escritórios") {
              return <MenuItem key={i} item={item} />;
            }
            if (item.name !== "Escritórios" && profile.zip && places) {
              return <MenuItem key={i} item={item} />;
            }
            return null;
          })}
        </nav>

        <MenuFooter />
      </div>
    </aside>
  );
}

export default Menu;
