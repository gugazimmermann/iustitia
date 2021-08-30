export function Header() {
  return (
    <header className="max-w-lg mx-auto">
    <a href={`${process.env.NX_APP_SITE}`}>
      <h1 className="text-4xl font-bold text-white text-center">
        Iustitia
      </h1>
    </a>
  </header>
  );
}

export default Header;
