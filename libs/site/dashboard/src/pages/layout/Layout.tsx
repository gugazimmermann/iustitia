import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "@iustitia/site/auth";
import { Menu } from "../..";
import Nav from "../../components/nav/Nav";
import Callout, {
  CALLOUTTYPES,
} from "../../components/dashboard/callout/Callout";

export interface Me {
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface LayoutProps {
  children: ReactNode;
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

        <main className="w-full lg:max-w-screen-lg h-full bg-gray-50 flex flex-col self-center">
          <Callout
            type={CALLOUTTYPES.WARNING}
            title="Seu cadastro está"
            emphasis="Incompleto"
            content="Por favor, acesse seu perfil e complete os items destacados."
          />

          <Callout
            type={CALLOUTTYPES.ERROR}
            title="Nenhum Escritório Cadastrado"
            content="Por favor, acesse seu perfil e complete os items destacados."
          />

          {me.email &&
            Children.map(children, (child) => {
              if (isValidElement(child)) {
                return cloneElement(child, { me, setMe });
              }
              return child;
            })}
        </main>
      </div>
    </div>
  );
}

export default Layout;
