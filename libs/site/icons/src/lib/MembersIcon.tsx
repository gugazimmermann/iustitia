import { IconProps } from "./interface";

export function MembersIcon({ styles, stroke }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles}
      viewBox="0 0 24 24"
      strokeWidth={stroke}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
      <circle cx="12" cy="10" r="3" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default MembersIcon;
