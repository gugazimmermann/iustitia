import { Link } from "react-router-dom";
import { AttachmentIcon } from "../..";

type AttachmentType = {
  date: string;
  name: string;
  link: string;
};

export interface AttachmentShowProps {
  attachment: AttachmentType;
}

export function AttachmentShow({ attachment }: AttachmentShowProps) {
  return (
    <Link
      to={attachment.link}
      target="_blank"
      download
      className="p-2 border border-primary-500 text-primary-500 flex items-center rounded-md justify-between space-x-2"
    >
      <div className="truncate">
        <AttachmentIcon styles="w-5 h-5 inline mr-2" stroke={2} />
        {attachment.name}
      </div>
      <p className="text-base">{attachment.date} hs</p>
    </Link>
  );
}

export default AttachmentShow;
