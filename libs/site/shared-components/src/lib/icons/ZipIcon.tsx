import { IconProps } from ".";

export function ZipIcon({ styles, stroke }: IconProps) {
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
      <path d="M6 20.735a2 2 0 0 1 -1 -1.735v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-1"></path>
      <path d="M11 17a2 2 0 0 1 2 2v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2a2 2 0 0 1 2 -2z"></path>
      <line x1="11" y1="5" x2="10" y2="5"></line>
      <line x1="13" y1="7" x2="12" y2="7"></line>
      <line x1="11" y1="9" x2="10" y2="9"></line>
      <line x1="13" y1="11" x2="12" y2="11"></line>
      <line x1="11" y1="13" x2="10" y2="13"></line>
      <line x1="13" y1="15" x2="12" y2="15"></line>
    </svg>
  );
}

export default ZipIcon;