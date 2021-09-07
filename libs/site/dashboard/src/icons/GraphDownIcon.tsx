import { IconProps } from ".";

export function GraphDownIcon({ styles, stroke }: IconProps) {
  return (
    <svg
      className={styles}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M3 3v18h18"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M18.7 14.3L15 10.5l-2.7 2.7L7 8"
      />
    </svg>
  );
}

export default GraphDownIcon;
