import { IconProps } from ".";

export function ArrowUpIcon({ styles, stroke }: IconProps) {
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
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="18" y1="11" x2="12" y2="5"></line>
      <line x1="6" y1="11" x2="12" y2="5"></line>
    </svg>
  );
}

export default ArrowUpIcon;
