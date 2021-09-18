import { IconProps } from ".";

export function VideoIcon({ styles, stroke }: IconProps) {
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
  <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z"></path>
  <rect x="3" y="6" width="12" height="12" rx="2"></rect>
</svg>
  );
}

export default VideoIcon;
