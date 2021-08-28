import { Link } from 'react-router-dom';

interface AuthLinkProps {
  link: string;
  text: string;
}

export function AuthLink({link, text}: AuthLinkProps) {
  return (
    <div className="flex justify-end">
    <Link to={link}>
      <div className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">
        {text}
      </div>
    </Link>
  </div>
  );
}

export default AuthLink;
