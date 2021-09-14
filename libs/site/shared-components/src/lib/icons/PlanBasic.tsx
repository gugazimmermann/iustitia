import { IconProps } from ".";

export function PlanBasic({ styles }: IconProps) {
  return (
    <svg
    className={ styles }
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeWidth="2"
  >
    <path
      d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
      fill="none"
      stroke="currentColor"
    />
    <path
      d="M15,23H9v-5H7v-6 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
      fill="none"
      stroke="currentColor"
    />
  </svg>
  );
}

export default PlanBasic;
