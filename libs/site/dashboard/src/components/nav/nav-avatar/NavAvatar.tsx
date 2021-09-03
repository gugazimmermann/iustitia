import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { logout } from "@iustitia/site/auth";
import { Me } from "../../../pages/layout/Layout";

export interface NavAvatarProps {
  me: Me;
}

export function NavAvatar({ me }: NavAvatarProps) {
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

  function getInitials(username: string) {
    if (username) {
      const name = username.split(" ");
      if (name.length === 1) return name[0][0];
      return `${name[0][0]}${name[1][0]}`;
    }
    return ".";
  }

  const handleLogout = () => {
    logout();
    history.push(Routes.SignIn);
  };

  function avatarButton(me: Me) {
    if (!me.avatar) {
      return (
        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-full flex justify-center items-center text-center font-bold text-2xl text-purple-500 bg-purple-50 hover:text-purple-900 hover:bg-purple-100 focus:outline-none focus:bg-purple-100 focus:ring-purple-900"
        >
          {getInitials(me.username)}
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
          src={me.avatar}
          alt={me.username}
        />
      </button>
    );
  }

  return (
    <div className="relative">
      {avatarButton(me)}
      <div
        ref={divRef}
        className={`absolute right-0 w-48 py-1 bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-5 focus:outline-none ${
          !open ? `hidden` : ``
        }`}
      >
        <div className="cursor-pointer w-full block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100">
          Seu Perfil
        </div>
        <div className="cursor-pointer w-full block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100">
          Configurações
        </div>
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
