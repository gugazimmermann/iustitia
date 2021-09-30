import { IconProps } from "./interface";

export function GraphUpIcon({ styles, stroke }: IconProps) {
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
        d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"
      />
    </svg>
  );
}

export default GraphUpIcon;
