import { Link } from 'react-router-dom';

interface NavItemProps {
  link: string;
  text: string;
  active: boolean;
}

export function NavItem({ link, text, active }: NavItemProps) {
  return (
    <Link to={link}>
      <span
        className={
          'inline-block text-black no-underline py-2 px-4 ' +
          (active ? 'font-bold' : 'hover:text-gray-800 hover:text-underline')
        }
      >
        {text}
      </span>
    </Link>
  );
}

export default NavItem;
