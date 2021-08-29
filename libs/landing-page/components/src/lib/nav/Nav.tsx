import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LandingPageRoutes as Routes } from "@iustitia/react-routes"
import { NavItem } from "../..";

export function Nav() {
  const location = useLocation();
  const [menu, SetMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const appSite = process.env.NX_APP_SITE || "";

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="header"
      className={
        "w-full z-30 top-0 text-white sticky " + (scrollPosition > 50 && "menu")
      }
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-2">
        <div className="pl-4 flex items-center">
          <Link to="/">
            <span className="text-black no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
              Iustitia
            </span>
          </Link>
        </div>

        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            className="gradient2 flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-green-500 appearance-none focus:outline-none"
            onClick={() => SetMenu(!menu)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className={
            "w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 text-black p-4 lg:p-0 z-20 " +
            (!menu && "hidden")
          }
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <NavItem
                link="/"
                text="Início"
                active={location.pathname === "/" ? true : false}
              />
            </li>
            <li className="mr-3">
              <NavItem
                link={Routes.Functionalities}
                text="Funcionalidades"
                active={location.pathname === "/funcionalidades" ? true : false}
              />
            </li>
            <li className="mr-3">
              <NavItem
                link={Routes.Plans}
                text="Planos"
                active={location.pathname === "/planos" ? true : false}
              />
            </li>
          </ul>
          <button
            id="navAction"
            className="gradient2 mx-auto lg:mx-0 hover:underline text-gray-800 font-extrabold rounded mt-4 lg:mt-0 py-4 px-8 shadow opacity-75"
            onClick={() => window.location.assign(appSite)}
          >
            Entrar
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
