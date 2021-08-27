import { Link } from 'react-router-dom';
import { Routes } from '../../app/App';

export function Footer() {
  return (
    <footer className="container mx-auto px-8 border-t border-gray-300">
      <div className="w-full flex flex-col md:flex-row py-6">
        <div className="flex-1 mb-6">
          <Link to="/">
            <span className="text-orange-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
              Iustitia
            </span>
          </Link>
        </div>

        <div className="flex-1">
          <p className="uppercase font-extrabold text-gray-500 md:mb-6">
            Links
          </p>
          <ul className="list-reset mb-6">
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <Link to={Routes.Faq}>
                <span className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500">
                  FAQ
                </span>
              </Link>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <Link to={Routes.Help}>
                <span className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500">
                  Ajuda
                </span>
              </Link>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <Link to={Routes.Suport}>
                <span className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500">
                  Suporte
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <p className="uppercase font-extrabold text-gray-500 md:mb-6">
            Legal
          </p>
          <ul className="list-reset mb-6">
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <Link to={Routes.Terms}>
                <span className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500">
                  Termos
                </span>
              </Link>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <Link to={Routes.Privacity}>
                <span className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500">
                  Privacidade
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <p className="uppercase font-extrabold text-gray-500 md:mb-6">
            Social
          </p>
          <ul className="list-reset mb-6">
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <a
                className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500"
                target="_blank"
                href="https://www.facebook.com"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <a
                className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500"
                target="_blank"
                href="https://www.linkedin.com"
                rel="noopener noreferrer"
              >
                Linkedin
              </a>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <a
                className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500"
                target="_blank"
                href="https://www.twitter.com"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <p className="uppercase font-extrabold text-gray-500 md:mb-6">
            Empresa
          </p>
          <ul className="list-reset mb-6">
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <Link to={Routes.AboutUs}>
                <span className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500">
                  Sobre Nós
                </span>
              </Link>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <Link to={Routes.Contact}>
                <span className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500">
                  Contato
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
