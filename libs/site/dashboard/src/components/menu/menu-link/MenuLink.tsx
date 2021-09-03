export interface MenuLinkProps {
  subitem: string;
}

export function MenuLink({ subitem }: MenuLinkProps) {
  return (
    <div className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md hover:text-gray-700">
      {subitem}
    </div>
  );
}

export default MenuLink;
