import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { DateTime } from "luxon";
import {
  Alert,
  AlertInterface,
  Callout,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { PlacesServices, ProfilesServices } from "@iustitia/site/services";
import { Nav, Menu } from "./components";

type ProfilesType = ProfilesServices.ProfilesRes;

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: "",
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const [menuOpen, setMenuOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profile, setProfile] = useState({} as ProfilesType);
  const [places, setPlaces] = useState<number>(0);

  useEffect(() => {
    const { innerWidth: width } = window;
    if (width <= 640) setMenuOpen(false);
    whoIAm();
    countPlaces();
  }, []);

  async function whoIAm() {
    try {
      const data = (await ProfilesServices.getOne()) as ProfilesType;
      setProfile(data);
      freePlanMsg(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function countPlaces() {
    try {
      const countPlaces = (await PlacesServices.count()) as number;
      setPlaces(countPlaces);
    } catch (err) {
      console.error(err);
    }
  }

  function subscriptionEndDate(createdAt: string, frequency: number) {
    const subsCreatedAt = DateTime.fromISO(createdAt).plus({ days: frequency });
    const finish = subsCreatedAt.diff(DateTime.now(), ["days"]);
    return Math.ceil(finish.toObject().days as number);
  }

  function freePlanMsg(profile: ProfilesType) {
    if (
      profile.subscription &&
      profile.subscription.planId === process.env.NX_FREE_PLAN
    ) {
      const days = subscriptionEndDate(
        profile.subscription.createdAt,
        profile.subscription.frequency as number
      );
      setShowAlert({
        show: true,
        message: `${profile.subscription.reason} termina em ${
          days === 0 ? `Hoje` : days > 1 ? `${days} dias` : `${days} dia`
        }.`,
        type: days > 3 ? WARNING_TYPES.NONE : WARNING_TYPES.WARNING,
      });
    }
  }

  return (
    <div className="flex h-screen antialiased text-gray-900 bg-gray-100">
      <Menu
        profile={profile}
        places={places}
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
      />
      <div className="flex flex-col flex-1 min-h-screen overflow-x-hidden overflow-y-auto">
        <Nav
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          setNavOpen={setNavOpen}
          navOpen={navOpen}
          setNotificationOpen={setNotificationOpen}
          notificationOpen={notificationOpen}
          profile={profile}
          places={places}
        />
        {/* md:max-w-screen-lg */}
        <main className="h-full bg-gray-50">
          {showAlert.show && <Alert alert={showAlert} />}
          {(!profile.zip || places === 0) && (
            <Callout
              type={WARNING_TYPES.NONE}
              title="Complete o(s) dado(s) abaixo para liberar o sistema."
            />
          )}
          {!profile.zip && (
            <Callout
              type={WARNING_TYPES.ERROR}
              title="Seu Perfil est??"
              emphasis="Incompleto"
              content={`Acesse seu Perfil clicando ${
                profile.avatar && `em sua foto`
              } no canto superior direito.`}
            />
          )}
          {places === 0 && (
            <Callout
              type={WARNING_TYPES.WARNING}
              title="Nenhum Escrit??rio Cadastrado"
              content={`Acesse Escrit??rios clicando no menu ao lateral.`}
            />
          )}
          {profile.email &&
            Children.map(children, (child) => {
              if (isValidElement(child)) {
                return cloneElement(child, {
                  profile,
                  setProfile,
                  places,
                  setPlaces,
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
