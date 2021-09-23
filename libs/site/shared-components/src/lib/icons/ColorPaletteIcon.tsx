import { IconProps } from ".";

export function ColorPaletteIcon({ styles, stroke }: IconProps) {
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
      <path d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25"></path>
      <circle
        cx="7.5"
        cy="10.5"
        r=".5"
        fill="currentColor"
      ></circle>
      <circle
        cx="12"
        cy="7.5"
        r=".5"
        fill="currentColor"
      ></circle>
      <circle
        cx="16.5"
        cy="10.5"
        r=".5"
        fill="currentColor"
      ></circle>
    </svg>
  );
}

export default ColorPaletteIcon;