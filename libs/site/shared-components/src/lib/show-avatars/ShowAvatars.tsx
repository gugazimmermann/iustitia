import {SimpleProfilesListInterface} from "@iustitia/interfaces"
import { getUserInitials } from "@iustitia/site/shared-utils";
import { Tooltip } from "../..";

export interface AvatarListProps {
  toShow: SimpleProfilesListInterface[];
  qtd: number;
}

export function AvatarList({ toShow, qtd }: AvatarListProps) {
  const cloneToShow = toShow.slice(0, qtd);
  return (
    <>
      {cloneToShow &&
        cloneToShow.map((u, i) => (
          <Tooltip key={i} message={u.name} styles="w-8 h-8 -ml-1">
            {u.avatar ? (
              <img
                className="w-8 h-8 rounded-full"
                src={`${process.env.NX_BUCKET_AVATAR_URL}${u.avatar}`}
                alt={u.name}
              />
            ) : (
              <span className="w-8 h-8 rounded-full flex justify-center items-center text-center font-bold text-primary-500 bg-primary-50">
                {u.name ? getUserInitials(u.name) : "I"}
              </span>
            )}
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

export interface ShowAvatarsProps {
  toShow: SimpleProfilesListInterface[];
  qtd: number;
  smallQtd: number;
}

export function ShowAvatars({ toShow, qtd, smallQtd }: ShowAvatarsProps) {
  return (
    <>
      <div className="hidden space-x-2 sm:flex">
        {<AvatarList toShow={toShow} qtd={qtd} />}
      </div>
      <div className="flex space-x-2 sm:hidden">
        {<AvatarList toShow={toShow} qtd={smallQtd} />}
      </div>
    </>
  );
}
export default ShowAvatars;
