import { AttachmentIcon } from "../..";
import { TrashIcon } from "../icons";

interface AttachmentInterface {
  id: string;
  date: string;
  name: string;
  link: string;
}
export interface AttachmentShowProps {
  attachment: AttachmentInterface;
  loading: boolean;
  selectAttchment(attachment: AttachmentInterface): void;
}

export function AttachmentShow({
  attachment,
  loading,
  selectAttchment,
}: AttachmentShowProps) {
  return (
    <div className="p-2 border border-primary-500 text-primary-500 flex items-center rounded-md justify-between">
      <a
        href={process.env.NX_BUCKET_AVATAR_URL + attachment.link}
        download
        className="truncate text-sm"
      >
        <AttachmentIcon styles="w-4 h-4 inline mr-2" stroke={2} />
        {attachment.name}
      </a>
      <div className="text-sm">
        {attachment.date} hs
        <button
          disabled={loading}
          onClick={() => {
            selectAttchment(attachment);
          }}
        >
          <TrashIcon styles="w-4 h-4 inline ml-4 text-red-500" stroke={2} />
        </button>
      </div>
    </div>
  );
}

export default AttachmentShow;
