import { IconProps } from "./interface";

export function SheetIcon({ styles, stroke }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles}
      strokeWidth={stroke}
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <rect x="4" y="4" width="16" height="16" rx="2"></rect>
      <line x1="4" y1="10" x2="20" y2="10"></line>
      <line x1="10" y1="4" x2="10" y2="20"></line>
    </svg>
  );
}

export default SheetIcon;
