import { useEffect, useRef } from "react";
import {
  NavAvatar,
  NAVICONS,
  NavItem,
  NavMenuButton,
  NavMobileButton,
} from ".";
import { ProfileInterface, OfficeInterface } from "../../Layout";
import NavNotification from "./nav-notification/NavNotification";

export interface NavProps {
  setMenuOpen(menuOpen: boolean): void;
  menuOpen: boolean;
  setNavOpen(navOpen: boolean): void;
  navOpen: boolean;
  setNotificationOpen(notificationOpen: boolean): void;
  notificationOpen: boolean;
  profile: ProfileInterface;
  offices: number;
}

export function Nav({
  setMenuOpen,
  menuOpen,
  setNavOpen,
  navOpen,
  setNotificationOpen,
  notificationOpen,
  profile,
  offices,
}: NavProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkIfClickedOutside = (e: { target: any }) => {
      if (navOpen && divRef.current && !divRef.current.contains(e.target)) {
        setNavOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [navOpen, setNavOpen]);

  function showNavItems(profile: ProfileInterface) {
    return (
      <>
        {profile.zip && offices > 0 && (
          <div className="pt-1 space-x-2">
            <NavItem
              item="Notification"
              icon={NAVICONS.NOTIFICATION}
              alert={true}
              open={setNotificationOpen}
              openState={notificationOpen}
            />
            <NavItem item="Search" icon={NAVICONS.SEARCH} alert={false} />
            {profile?.role === "Admin" && (
              <NavItem item="Settings" icon={NAVICONS.SETTINGS} alert={false} />
            )}
          </div>
        )}
        <NavAvatar profile={profile} />
      </>
    );
  }

  return (
    <header className="relative flex-shrink-0 bg-white z-40">
      <div className="px-4 flex items-center justify-between border-b h-14">
        <NavMenuButton setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

        <NavMobileButton setNavOpen={setNavOpen} navOpen={navOpen} />

        {/* MOBILE */}
        <nav
          ref={divRef}
          className={`absolute flex justify-evenly bg-white rounded-md shadow-lg top-16 inset-x-4 md:hidden ${
            navOpen ? `` : `hidden`
          }`}
        >
          {showNavItems(profile)}
        </nav>

        {/* DESKTOP */}
        <nav className="hidden justify-end space-x-2 md:flex w-full">
          {showNavItems(profile)}
        </nav>
      </div>
      <NavNotification
        setNotificationOpen={setNotificationOpen}
        notificationOpen={notificationOpen}
      />
    </header>
  );
}

export default Nav;
