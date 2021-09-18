import { IconProps } from ".";

export function AudioIcon({ styles, stroke }: IconProps) {
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
  <circle cx="6" cy="17" r="3"></circle>
  <circle cx="16" cy="17" r="3"></circle>
  <polyline points="9 17 9 4 19 4 19 17"></polyline>
  <line x1="9" y1="8" x2="19" y2="8"></line>
</svg>
  );
}

export default AudioIcon;
