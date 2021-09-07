import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  link: string;
  text: string;
}

export function Link({link, text}: LinkProps) {
  return (
    <div className="flex justify-end">
    <RouterLink to={link}>
      <div className="text-sm text-primary-600 hover:text-primary-700 hover:underline mb-6">
        {text}
      </div>
    </RouterLink>
  </div>
  );
}

export default Link;
