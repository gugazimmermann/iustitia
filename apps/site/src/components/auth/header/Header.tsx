import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="max-w-lg mx-auto">
    <Link to="/">
      <h1 className="text-4xl font-bold text-white text-center">
        Iustitia
      </h1>
    </Link>
  </header>
  );
}

export default Header;
