import { getUserInitials } from "@iustitia/site/shared-utils";

export interface AvatarOrInitialProps {
  avatar: string | undefined;
  name: string | undefined;
  avatarStyle: string;
  initialStyle: string;
}

export function AvatarOrInitial({
  avatar,
  name,
  avatarStyle,
  initialStyle,
}: AvatarOrInitialProps) {
  return avatar ? (
    <img
      className={`${avatarStyle} rounded-full`}
      src={`${process.env.NX_BUCKET_AVATAR_URL}${avatar}`}
      alt={name}
    />
  ) : (
    <span className={`${initialStyle} rounded-full flex justify-center items-center text-center font-bold text-primary-500 bg-primary-50`}>
      {name ? getUserInitials(name) : (process.env.NX_APP_TITLE as string)[0]}
    </span>
  );
}

export default AvatarOrInitial;
