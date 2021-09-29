import { IconProps } from ".";

export function SelectorIcon({ styles, stroke }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles}
      viewBox="0 0 24 24"
      strokeWidth={stroke}
      fill="currentColor"
    >
  <path
    fillRule="evenodd"
    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
    clipRule="evenodd"
  ></path>
    </svg>
  );
}

export default SelectorIcon;
