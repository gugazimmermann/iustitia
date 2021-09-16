import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SiteRoutes as Routes, SiteRoutes } from "@iustitia/react-routes";
import { logout } from "@iustitia/site/auth";
import { getUserInitials } from "@iustitia/site/shared-utils";
import { IProfile } from "@iustitia/site/dashboard";

export interface NavAvatarProps {
  profile: IProfile;
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
    logout();
    history.push(Routes.SignIn);
  };

  function avatarButton(profile: IProfile) {
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
        <button
          onClick={() => setOpen(!open)}
          className="transition-opacity duration-200 rounded-full"
        >
          <span className="sr-only">Perfil Menu</span>
          <img
            className="w-10 h-10 rounded-full"
            src={`${process.env.NX_AVATAR_URL}${profile.avatar}`}
            alt={profile.name}
          />
        </button>
    );
  }

  return (
    <div className="relative z-40">
      {avatarButton(profile)}
      <div
        ref={divRef}
        className={`absolute right-0 w-48 py-1 bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-5 focus:outline-none ${
          !open ? `hidden` : ``
        }`}
      >
        <Link
          to={SiteRoutes.Offices}
          className="cursor-pointer w-full block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
        >
          Escritórios
        </Link>
        <Link
          to={SiteRoutes.Profile}
          className="cursor-pointer w-full block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
        >
          Seu Perfil
        </Link>
        <Link
          to={SiteRoutes.Subscriptions}
          className="cursor-pointer w-full block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
        >
          Assinatura
        </Link>
        <div
          onClick={() => handleLogout()}
          className="cursor-pointer w-full block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
        >
          Sair
        </div>
      </div>
    </div>
  );
}

export default NavAvatar;
