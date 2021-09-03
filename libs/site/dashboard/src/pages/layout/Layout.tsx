import { useEffect, useState } from "react";
import { getCurrentUser } from "@iustitia/site/auth";
import { Menu } from "../..";
import Nav from "../../components/nav/Nav";

export interface Me {
  username: string;
  email: string;
  tenant: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [me, setMe] = useState({} as Me);

  useEffect(() => {
    const { innerWidth: width } = window;
    if (width <= 640) setMenuOpen(false);

    whoIAm();
    async function whoIAm() {
      try {
        const data: Me = await getCurrentUser();
        // data.avatar = "https://avatars.githubusercontent.com/u/48167381?v=4"
        setMe(data);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <div className="flex h-screen antialiased text-gray-900 bg-gray-100">
      <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className="flex flex-col flex-1 min-h-screen overflow-x-hidden overflow-y-auto">
        <Nav
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          setNavOpen={setNavOpen}
          navOpen={navOpen}
          setNotificationOpen={setNotificationOpen}
          notificationOpen={notificationOpen}
          me={me}
        />
        <div className="w-full h-full p-4">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
