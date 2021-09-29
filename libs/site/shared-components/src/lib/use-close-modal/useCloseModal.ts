import { useEffect, useRef } from "react";

export interface useCloseModalProps {
  open: boolean;
  setOpen(open: boolean): void;
}
export const useCloseModal = ({open, setOpen}: useCloseModalProps) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const checkIfClickedOutside = (e: { target: any }) => {
        if (open && ref.current && !ref.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", checkIfClickedOutside);
      return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return ref;
};

export default useCloseModal
