import { useState } from "react";
import { SelectorIcon } from "@iustitia/site/icons";
import { BusinessContactsServices, MembersServices, PlacesServices } from "@iustitia/site/services";
import OwnersModalContentList from "../owners-modal-content-list/OwnersModalContentList";

type MembersSimpleType = MembersServices.MembersSimpleRes;
type ProfilesListType = PlacesServices.ProfilesListRes;
type OnwersListType = BusinessContactsServices.OnwersListRes;
type PlacesType = PlacesServices.PlacesRes;

export interface OwnersModalContentProps {
  title: string;
  membersList: ProfilesListType[];
  placesList: PlacesType[];
  currentList: OnwersListType[];
  handleSelect(p: MembersSimpleType): void;
}

export function OwnersModalContent({
  title,
  membersList,
  placesList,
  currentList,
  handleSelect,
}: OwnersModalContentProps) {
  const [listOpen, setListOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 gap-4 p-4 ">
      <div className="grid grid-cols-12 gap-4 col-span-full lg:col-span-3 ">
        <div className="col-span-full flex items-center space-x-2">
          <span>Selecionados: {currentList.map(o => o.name).join(", ")}</span>
        </div>
        <div className="col-span-full">
          <div className="mt-1 relative">
            <button
              type="button"
              className="cursor-pointer relative w-full bg-white rounded-md shadow-lg pl-3 pr-10 py-3 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onClick={() => setListOpen(true)}
            >
              <span className="flex items-center ml-3 truncate">{title}</span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon styles="h-7 w-7 text-gray-400" />
              </span>
            </button>
            {listOpen && (
              <OwnersModalContentList
                membersList={membersList}
                placesList={placesList}
                currentList={currentList}
                handleSelect={handleSelect}
                open={listOpen}
                setOpen={setListOpen}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnersModalContent;
