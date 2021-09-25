import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { DateTime } from "luxon";
import { Alert, Callout } from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { ProfileServices, OfficeServices } from "@iustitia/site/services";
import { Nav, Menu } from "./components";

export const { route, singular, parents, plural } =
  ProfileServices.ProfileModule;
export type ProfileInterface = ProfileServices.ProfileInterface;
export type OfficeInterface = OfficeServices.OfficeInterface;

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profile, setProfile] = useState({} as ProfileInterface);
  const [offices, setOffices] = useState({} as OfficeInterface[]);

  useEffect(() => {
    const { innerWidth: width } = window;
    if (width <= 640) setMenuOpen(false);

    whoIAm();
    async function whoIAm() {
      try {
        const data = (await ProfileServices.getOne()) as ProfileInterface;
        if (data.subscription) data.subscription.basic = data.subscription?.reason.toLowerCase().includes("profissional") ? false : true;
        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    }

    seeOffices();
    async function seeOffices() {
      try {
        const data = (await OfficeServices.getAll()) as OfficeInterface[];
        setOffices(data);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  function subscriptionEndDate(createdAt: string, frequency: number) {
    const subsCreatedAt = DateTime.fromISO(createdAt).plus({ days: frequency });
    const finish = subsCreatedAt.diff(DateTime.now(), ["days"]);
    return Math.ceil(finish.toObject().days as number);
  }

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
        {/* md:max-w-screen-lg */}
        <main className="h-full bg-gray-50">
          {profile.subscription &&
            profile.subscription.planId === process.env.NX_FREE_PLAN && (
              <Alert
                type={
                  subscriptionEndDate(
                    profile.subscription.createdAt,
                    profile.subscription.frequency
                  ) > 3
                    ? WARNING_TYPES.NONE
                    : WARNING_TYPES.WARNING
                }
                message={`${
                  profile.subscription.reason
                } termina em ${subscriptionEndDate(
                  profile.subscription.createdAt,
                  profile.subscription.frequency
                )} dias.`}
              />
            )}
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
              content={`Acesse Escritórios clicando em ${
                profile.avatar ? `sua foto` : `suas iniciais`
              } no canto superior direito.`}
            />
          )}

          {profile.email &&
            Children.map(children, (child) => {
              if (isValidElement(child)) {
                return cloneElement(child, {
                  profile,
                  setProfile,
                  offices,
                  setOffices,
                });
              }
              return child;
            })}
        </main>
      </div>
    </div>
  );
}

export default Layout;
