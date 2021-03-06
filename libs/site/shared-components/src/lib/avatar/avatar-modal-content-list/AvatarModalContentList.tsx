import { CheckIcon } from "@iustitia/site/icons";
import { MembersServices } from "@iustitia/site/services";
import useCloseModal from "../../use-close-modal/useCloseModal";
import AvatarOrInitial from "../avatar-or-initial/AvatarOrInitial";

type MembersSimpleType = MembersServices.MembersSimpleRes;

export interface AvatarModalContentListProps {
  membersList: MembersSimpleType[];
  currentList: MembersSimpleType[];
  handleSelect(p: MembersSimpleType): void;
  open: boolean;
  setOpen(open: boolean): void;
}

export function AvatarModalContentList({
  membersList,
  currentList,
  handleSelect,
  open,
  setOpen,
}: AvatarModalContentListProps) {
  const ref = useCloseModal({ open, setOpen });
  return (
    <div
      ref={ref}
      className="absolute z-30 -mt-5 w-full rounded-md bg-white shadow-lg"
    >
      <ul className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        {membersList.map((p, i) => (
          <li
            key={i}
            className="text-gray-900 cursor-default hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9"
            onClick={() => {
              handleSelect(p);
              setOpen(false);
            }}
          >
            <div className="flex items-center">
              <AvatarOrInitial
                avatar={p.avatar}
                name={p.name}
                avatarStyle="flex-shrink-0 h-8 w-8"
                initialStyle="flex-shrink-0 h-8 w-8"
              />
              <span className="ml-3 block font-normal truncate">{p.name}</span>
            </div>
            {currentList.some((s) => s.id === p.id) && (
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

export default AvatarModalContentList;
