import { CheckIcon } from "@iustitia/site/icons";
import {
  BusinessContactsServices,
  MembersServices,
  PlacesServices,
} from "@iustitia/site/services";
import { useState } from "react";
import { useEffect } from "react";
import useCloseModal from "../../use-close-modal/useCloseModal";

type MembersSimpleType = MembersServices.MembersSimpleRes;
type PlacesType = PlacesServices.PlacesRes;
type OnwersListType = BusinessContactsServices.OnwersListRes;

export interface OwnersModalContentListProps {
  membersList: MembersSimpleType[];
  placesList: PlacesType[];
  currentList: OnwersListType[];
  handleSelect(p: OnwersListType): void;
  open: boolean;
  setOpen(open: boolean): void;
}

export function OwnersModalContentList({
  membersList,
  placesList,
  currentList,
  handleSelect,
  open,
  setOpen,
}: OwnersModalContentListProps) {
  const ref = useCloseModal({ open, setOpen });
  const [all, setAll] = useState<OnwersListType[]>([]);

  useEffect(() => {
    const data: OnwersListType[] = [];
    membersList.forEach((m) =>
      data.push({ id: m.id, name: m.name, type: "person" })
    );
    placesList.forEach((p) =>
      data.push({ id: p.id, name: p.name, type: "place" })
    );
    setAll(data);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute z-30 -mt-5 w-full rounded-md bg-white shadow-lg"
    >
      <ul className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        {all.map((x, i) => (
          <li
            key={i}
            className="text-gray-900 cursor-default hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9"
            onClick={() => {
              handleSelect(x);
              setOpen(false);
            }}
          >
            <div className="flex items-center">
              <span className="ml-3 block font-normal truncate">{x.name}</span>
            </div>
            {currentList.some((s) => s.id === x.id) && (
              <span className="absolute inset-y-0 right-0 flex items-center">
                <CheckIcon styles="h-8 w-8 text-secondary-500" />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OwnersModalContentList;
