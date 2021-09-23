import { DefaultColors, DefaultVariants } from "@iustitia/site/shared-utils";
import { useEffect, useRef } from "react";

export interface ColorPickerProps {
  setColor(color: string): void;
  open: boolean;
  setOpen(open: boolean): void;
}

export function ColorPicker({ setColor, open, setOpen }: ColorPickerProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkIfClickedOutside = (e: { target: any }) => {
      if (open && divRef.current && !divRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div ref={divRef} className="absolute z-10 right-0 rounded-md shadow-lg">
      <div className="rounded-md bg-white shadow-xs p-2">
        <div className="flex">
          {DefaultColors.map((c, i) => (
            <div key={i}>
              {DefaultVariants.map((v, j) => (
                <div
                  key={j}
                  className={`cursor-pointer w-6 h-6 rounded-full mx-1 my-1 bg-${c}-${v}`}
                  onClick={() => setColor(`${c}-${v}`)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
