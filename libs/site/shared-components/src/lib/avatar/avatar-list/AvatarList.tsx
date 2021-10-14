import { PlacesServices } from "@iustitia/site/services";
import Tooltip from "../../tooltip/Tooltip";
import AvatarOrInitial from "../avatar-or-initial/AvatarOrInitial";

type ProfilesListType = PlacesServices.ProfilesListRes;

export interface AvatarListShowProps {
  toShow: ProfilesListType[];
  qtd: number;
}

export function AvatarListShow({ toShow, qtd }: AvatarListShowProps) {
  const cloneToShow = toShow.slice(0, qtd);
  return (
    <>
      {cloneToShow &&
        cloneToShow.map((u, i) => (
          <Tooltip key={i} message={u.name} styles="w-8 h-8 -ml-1">
            <AvatarOrInitial
              avatar={u.avatar}
              name={u.name}
              avatarStyle="h-8 w-8"
              initialStyle="h-8 w-8"
            />
          </Tooltip>
        ))}
      {toShow.length > qtd && (
        <span className="w-8 h-8 -ml-1 rounded-full flex justify-center items-center text-center font-bold text-primary-500 bg-primary-50">
          +{toShow.length - qtd}
        </span>
      )}
    </>
  );
}

export interface AvatarListProps {
  toShow: ProfilesListType[];
  qtd: number;
  smallQtd: number;
}

export function AvatarList({ toShow, qtd, smallQtd }: AvatarListProps) {
  return (
    <>
      <div className={`hidden sm:flex ${toShow.length < qtd && `space-x-2`}`}>
        {<AvatarListShow toShow={toShow} qtd={qtd} />}
      </div>
      <div className={`flex sm:hidden ${toShow.length < qtd && `space-x-2`}`}>
        {<AvatarListShow toShow={toShow} qtd={smallQtd} />}
      </div>
    </>
  );
}
export default AvatarList;
