import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { getProfile } from "../../services/profile";
import { Menu } from "../..";
import Nav from "../../components/nav/Nav";
import Callout from "../../components/dashboard/callout/Callout";
import { IOffice, IProfile } from "../../interfaces";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { getAll as getOffices } from "../../services/office";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profile, setProfile] = useState({} as IProfile);
  const [offices, setOffices] = useState({} as IOffice[]);

  useEffect(() => {
    const { innerWidth: width } = window;
    if (width <= 640) setMenuOpen(false);

    whoIAm();
    async function whoIAm() {
      try {
        const data: IProfile = await getProfile();
        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    }

    seeOffices();
    async function seeOffices() {
      try {
        const data: IOffice[] = await getOffices();
        setOffices(data);
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
          profile={profile}
        />

        <main className="w-full lg:max-w-screen-lg h-full bg-gray-50 flex flex-col self-center">
          {!profile.zip && (
            <Callout
              type={WARNING_TYPES.WARNING}
              title="Seu Perfil está"
              emphasis="Incompleto"
              content="Acesse seu Perfil clicando em suas iniciais no canto superior direito."
            />
          )}

          {!offices.length && (
            <Callout
              type={WARNING_TYPES.WARNING}
              title="Nenhum Escritório Cadastrado"
              content={`Acesse Escritórios clicando em ${profile.avatar ? `sua foto` : `suas iniciais`} no canto superior direito.`}
            />
          )}

          {profile.email &&
            Children.map(children, (child) => {
              if (isValidElement(child)) {
                return cloneElement(child, { profile, setProfile, setOffices });
              }
              return child;
            })}
        </main>
      </div>
    </div>
  );
}

export default Layout;
