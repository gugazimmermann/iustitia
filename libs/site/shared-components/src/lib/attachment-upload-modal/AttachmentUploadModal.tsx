import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatBytes } from "@iustitia/site/shared-utils";
import { AttachmentUploadDetails } from "./AttachmentUploadDetails";

const acceptedTypes = [
  "audio/*",
  "video/*",
  "image/*",
  "text/plain",
  "application/json",
  "application/pdf",
  "application/zip",
  "application/vnd.rar",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.oasis.opendocument.text",
];

export interface AttachmentFile extends File {
  preview: string;
  path: string;
}

export interface AttachmentUploadModalProps {
  maxSize: number;
  maxNumberFiles: number;
  setShowModal(modal: boolean): void;
  action(files: AttachmentFile[]): void;
}

export function AttachmentUploadModal({
  maxSize,
  maxNumberFiles,
  setShowModal,
  action,
}: AttachmentUploadModalProps) {
  const [files, setFiles] = useState<AttachmentFile[]>([]);

  function sizeValidator(file: File) {
    if (file.size > maxSize) {
      return {
        code: "file-too-big",
        message: `Arquivo muito grande: ${formatBytes(
          file.size
        )} - Máx ${formatBytes(maxSize)}`,
      };
    }
    return null;
  }

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: acceptedTypes.join(", "),
    maxFiles: maxNumberFiles,
    onDrop,
    validator: sizeValidator,
  });

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white sm:flex sm:items-start">
            <div className="h-full overflow-auto p-4 w-full flex flex-col">
              <div
                {...getRootProps()}
                className={`border-primary-500 h-44 border-dashed border-2 flex flex-col justify-center items-center ${
                  isDragActive && `border-secondary-500`
                } ${isDragAccept && `border-green-500`} ${
                  isDragReject && `border-red-500`
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Solte os arquivos aqui...</p>
                ) : (
                  <div className="space-y-2 text-center">
                    <p>Arraste os arquivos ou click para selecionar</p>
                    <p> Máximo 4 Arquivos</p>
                    <p> Tamanho Máximo por Arquivo: {formatBytes(maxSize)}</p>
                  </div>
                )}
              </div>
              {files.length > 0 ? (
                <div className="mt-4 space-y-2">
                  {files.map((f, i) => AttachmentUploadDetails(f, i))}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center mt-4">
                  <img
                    className="mx-auto w-32"
                    src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                    alt="no data"
                  />
                  <span className="text-small text-gray-500">
                    Nenhum Arquivo Selecionado
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => {
                action(files);
                setShowModal(false);
              }}
              disabled={files.length === 0}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-white text-base font-medium sm:ml-3 sm:w-auto sm:text-sm bg-primary-500`}
            >
              Enviar Arquivos
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
              }}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttachmentUploadModal;
