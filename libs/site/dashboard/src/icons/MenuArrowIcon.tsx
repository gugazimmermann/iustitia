import { IconProps } from ".";

export interface MenuArrowIconProps extends IconProps {
  active: boolean;
}

export function MenuArrowIcon({ styles, active }: MenuArrowIconProps) {
  return (
    <svg
      className={`${styles} ${active && `rotate-180 `}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export default MenuArrowIcon;
