import { formatBytes } from "@iustitia/site/shared-utils";
import {
  AudioIcon,
  VideoIcon,
  TextIcon,
  SheetIcon,
  PresentationIcon,
  ZipIcon,
  PdfIcon,
  FileUnknowIcon,
} from "../icons";
import { AttachmentFile } from "./AttachmentUploadModal";

function imgPreview(
  type: "IMG" | "ICON",
  src: string,
  path: string,
  size: number,
  i: number
) {
  const iconFile = (icon: string) => {
    switch (icon) {
      case "audio":
        return <AudioIcon styles="w-6 text-primary-500" stroke={2} />;
      case "video":
        return <VideoIcon styles="w-6 text-primary-500" stroke={2} />;
      case "doc":
        return <TextIcon styles="w-6 text-primary-500" stroke={2} />;
      case "sheet":
        return <SheetIcon styles="w-6 text-primary-500" stroke={2} />;
      case "presentation":
        return <PresentationIcon styles="w-6 text-primary-500" stroke={2} />;
      case "zip":
        return <ZipIcon styles="w-6 text-primary-500" stroke={2} />;
      case "pdf":
        return <PdfIcon styles="w-6 text-primary-500" stroke={2} />;
      default:
        return <FileUnknowIcon styles="w-6 text-primary-500" stroke={2} />;
    }
  };
  return (
    <div key={i} className="space-x-4 flex flex-row items-center justify-start">
      {type === "IMG" ? <img src={src} alt={path} width={21} /> : iconFile(src)}
      <div className="w-full flex items-center justify-between">
        <div className="overflow-hidden truncate text-sm">{path}</div>
        <div className="text-sm">{formatBytes(size)}</div>
      </div>
    </div>
  );
}

export function AttachmentUploadDetails(file: AttachmentFile, i: number) {
  if (file.type.split("/")[0] === "image") {
    return imgPreview("IMG", file.preview, file.path, file.size, i);
  } else if (file.type.split("/")[0] === "audio") {
    return imgPreview("ICON", "audio", file.path, file.size, i);
  } else if (file.type.split("/")[0] === "video") {
    return imgPreview("ICON", "video", file.path, file.size, i);
  } else if (
    file.type === "application/json" ||
    file.type === "text/plain" ||
    file.type === "application/msword" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.type === "application/vnd.oasis.opendocument.text"
  ) {
    return imgPreview("ICON", "doc", file.path, file.size, i);
  } else if (
    file.type === "application/vnd.oasis.opendocument.spreadsheet" ||
    file.type === "application/vnd.ms-excel" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return imgPreview("ICON", "sheet", file.path, file.size, i);
  } else if (
    file.type === "application/vnd.ms-powerpoint" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.type === "application/vnd.oasis.opendocument.presentation"
  ) {
    return imgPreview("ICON", "presentation", file.path, file.size, i);
  } else if (
    file.type === "application/vnd.rar" ||
    file.type === "application/zip"
  ) {
    return imgPreview("ICON", "zip", file.path, file.size, i);
  } else if (file.type === "application/pdf") {
    return imgPreview("ICON", "pdf", file.path, file.size, i);
  }
  return <div></div>;
}
