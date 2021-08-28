import { Link } from "react-router-dom";
import { Routes } from "../../../app/App";

export function Footer() {
  return (
    <footer className="max-w-lg mx-auto flex justify-center text-white">
      <a href={`${process.env.NX_APP_LANDING_PAGE}/termos`}>
        <span className="hover:underline">Termos</span>
      </a>
      <span className="mx-3">•</span>
      <a href={`${process.env.NX_APP_LANDING_PAGE}/privacidade`}>
        <span className="hover:underline">Privacidade</span>
      </a>
    </footer>
  );
}

export default Footer;
