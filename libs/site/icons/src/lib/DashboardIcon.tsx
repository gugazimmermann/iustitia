import { IconProps } from "./interface";

export function DashboardIcon({ styles, stroke }: IconProps) {
  return (
<svg
  xmlns="http://www.w3.org/2000/svg"
  className={styles}
  viewBox="0 0 24 24"
  strokeWidth={stroke}
  stroke="currentColor"
  fill="none"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
  <rect x="9" y="3" width="6" height="4" rx="2"></rect>
  <path d="M9 17v-5"></path>
  <path d="M12 17v-1"></path>
  <path d="M15 17v-3"></path>
</svg>
  );
}

export default DashboardIcon;
