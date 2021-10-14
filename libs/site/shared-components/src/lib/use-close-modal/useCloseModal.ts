import { useEffect, useRef } from "react";

export interface useCloseModalProps {
  open: boolean;
  setOpen(open: boolean): void;
}

export const useCloseModal = ({open, setOpen}: useCloseModalProps) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const checkIfClickedOutside = (e: { target: any }) => {
        if (open && ref.current && !ref.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", checkIfClickedOutside);
      return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside);
      };
    }, [open]);

    return ref;
};

export default useCloseModal;
