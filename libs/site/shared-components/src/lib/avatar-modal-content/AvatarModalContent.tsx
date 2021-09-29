import { PeopleServices } from "@iustitia/site/services";
import { useState } from "react";
import { AvatarModalContentList, SelectorIcon, ShowAvatars } from "../..";

export interface AvatarModalContentProps {
  title: string;
  peopleList: PeopleServices.SimpleUserInterface[];
  currentList: PeopleServices.SimpleUserInterface[];
  handleSelect(p: PeopleServices.SimpleUserInterface): void;
}

export function AvatarModalContent({
  title,
  peopleList,
  currentList,
  handleSelect,
}: AvatarModalContentProps) {
  const [listOpen, setListOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 ">
      <div className="grid grid-cols-12 gap-4 col-span-full lg:col-span-3 ">
        <div className="col-span-full flex items-center space-x-2">
          <span>Selecionados:</span>
          {<ShowAvatars toShow={currentList} qtd={8} smallQtd={3} />}
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
              <AvatarModalContentList
                peopleList={peopleList}
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

export default AvatarModalContent;
