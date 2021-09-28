import { ReactNode, useState } from "react";

interface TooltipProps {
  message: string;
  styles?: string;
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
}

export function Tooltip({
  message,
  styles,
  children,
  bgColor,
  textColor,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const bg = bgColor ? bgColor : "black";
  const text = textColor ? textColor : "white";

  return (
    <div
      className={`relative ${styles}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      <div
        className={`whitespace-nowrap absolute bg-${bg} text-${text} text-sm px-1 z-10 -top-5 left-0 ${
          open ? `block` : `hidden`
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default Tooltip;
