import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SiteRoutes } from "@iustitia/react-routes";
import { getUserInitials } from "@iustitia/site/shared-utils";
import { AuthServices } from "@iustitia/site/services";
import { ProfilesInterface } from "@iustitia/interfaces";
import { AuthRoutes } from "@iustitia/site-modules";
export interface NavAvatarProps {
  profile: ProfilesInterface;
}

export function NavAvatar({ profile }: NavAvatarProps) {
  const history = useHistory();
  const divRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkIfClickedOutside = (e: { target: any }) => {
      if (open && divRef.current && !divRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  const handleLogout = () => {
    AuthServices.logout();
    history.push(AuthRoutes.SignIn);
  };

  function avatarButton(profile: ProfilesInterface) {
    if (!profile.avatar) {
      return (
        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-full flex justify-center items-center text-center font-bold text-2xl text-primary-500 bg-primary-50 hover:text-primary-900 hover:bg-primary-100 focus:outline-none focus:bg-primary-100 focus:ring-primary-900"
        >
          {profile.name ? getUserInitials(profile.name) : "I"}
        </button>
      );
    }
    return (
      <div className="pt-1">
        <button
          onClick={() => setOpen(!open)}
          className="transition-opacity duration-200 rounded-full"
        >
          <span className="sr-only">Perfil Menu</span>
          <img
            className="w-10 h-10 rounded-full"
            src={`${process.env.NX_BUCKET_AVATAR_URL}${profile.avatar}`}
            alt={profile.name}
          />
        </button>
      </div>
    );
  }

  function NavLink({ name, route }: { name: string; route: SiteRoutes }) {
    return (
      <Link
        to={route}
        onClick={() => setOpen(false)}
        className="cursor-pointer w-full block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-primary-100"
      >
        {name}
      </Link>
    );
  }

  return (
    <div className="relative z-10 pt-1">
      {avatarButton(profile)}
      <div
        ref={divRef}
        className={`absolute right-0 w-48 py-1 bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-5 focus:outline-none ${
          !open ? `hidden` : ``
        }`}
      >
        <NavLink route={SiteRoutes.Profile} name="Seu Perfil" />
        {profile.isAdmin && (
          <NavLink route={SiteRoutes.Subscriptions} name="Assinatura" />
        )}
        <div
          onClick={() => handleLogout()}
          className="cursor-pointer w-full block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-primary-100"
        >
          Sair
        </div>
      </div>
    </div>
  );
}

export default NavAvatar;
