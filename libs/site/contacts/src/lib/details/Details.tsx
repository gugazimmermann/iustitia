import { useState } from "react";
import { DateTime } from "luxon";
import { getUserInitials, WARNING_TYPES } from "@iustitia/site/shared-utils";
import {
  Alert,
  AttachmentFile,
  AttachmentShow,
  AttachmentUploadModal,
} from "@iustitia/site/shared-components";
import { ModuleInterface } from "../Contacts";
import * as Services from "../services";

export interface DetailsProps {
  data: ModuleInterface;
}

const AttachmentList = [
  {
    date: DateTime.now().toFormat("dd/MM/yyyy HH:mm"),
    name: "Contrato de Compra e Venda",
    link: "",
  },
];

type noteType = {
  date: string;
  title: string;
  content: string;
};

const notesList: noteType[] = [
  {
    date: DateTime.now().toFormat("dd/MM/yyyy HH:mm"),
    title: "Reunião sobre processos",
    content:
      "Aliquam erat volutpat. Phasellus vestibulum porttitor est quis efficitur. Suspendisse fringilla sem non urna mattis, ac dignissim odio laoreet.\n\nPhasellus posuere turpis a tempus dictum. Curabitur feugiat molestie ipsum, non pulvinar risus bibendum ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam aliquet, purus sed malesuada elementum, tortor nunc ultrices dolor, ut sollicitudin velit odio at mi. Quisque id varius nibh. Mauris ultrices lacinia tortor sed efficitur.\n\nPhasellus in neque odio. Quisque nibh quam, ultricies efficitur turpis nec, pellentesque dignissim lorem. Ut pharetra lectus sit amet felis aliquam pretium. Fusce aliquam ex semper risus malesuada, at faucibus nunc placerat. Suspendisse hendrerit elit id neque pretium tempus. Fusce euismod dolor et ultrices ultrices.",
  },
  {
    date: DateTime.now().minus({ days: 7 }).toFormat("dd/MM/yyyy HH:mm"),
    title: "Reunião sobre layout",
    content:
      "Phasellus quis nunc at nulla eleifend rutrum. Nullam euismod quis sapien sed dictum. Maecenas tincidunt mauris in enim tincidunt, dignissim dictum erat fermentum. Curabitur fringilla ac urna quis porttitor.\n\nAliquam non magna ultricies, auctor nunc nec, accumsan sapien. Phasellus auctor, libero nec tincidunt euismod, odio diam dapibus orci, eget porta nibh nisl id metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac lectus ut sem gravida egestas et sed dui. Fusce lobortis quis mauris non tincidunt.",
  },
  {
    date: DateTime.now().minus({ days: 14 }).toFormat("dd/MM/yyyy HH:mm"),
    title: "Brainstorm",
    content:
      "Ut mattis, purus nec ultrices luctus, risus urna volutpat ligula, ut porttitor elit mi eu felis. Donec sit amet efficitur ipsum, ut maximus leo. Proin at orci ut odio hendrerit blandit. Phasellus aliquet a nisl a porttitor.\n\nNunc efficitur nunc tortor, in eleifend tellus laoreet vel. Maecenas dignissim eleifend augue, quis malesuada felis egestas vel. Proin vitae nisl mollis, viverra quam ac, euismod leo.",
  },
];

export function Details({ data }: DetailsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAttModal, setShowAttModal] = useState(false);
  const [attUploadProgress, setAttUploadProgress] = useState<number>();

  function formatAddress() {
    return data.address || data.number || data.complement ? (
      <div className="col-span-9">
        <p>
          {data.address && `${data.address}`}
          {data.address && data.number && `, `}
          {data.number && `${data.number}`}
          {(data.address || data.number) && data.complement && ` - `}
          {data.complement && `${data.complement}`}
        </p>
        <p>
          {data.neighborhood && `${data.neighborhood}`}
          {data.neighborhood && data.city && `, `}
          {data.city && `${data.city}`}
          {(data.neighborhood || data.city) && data.state && ` / `}
          {data.state && `${data.state}`}
          {(data.neighborhood || data.city || data.state) && data.zip && ` - `}
          {data.zip && `${data.zip}`}
        </p>
      </div>
    ) : null;
  }

  async function receiveAttFromModal(files: AttachmentFile[]) {
    if (files.length > 0) {
      setAttUploadProgress(0);
      uploadAttachmentsFromModal(files);
    }
  }

  async function uploadAttachmentsFromModal(files: AttachmentFile[]) {
    setLoading(true);
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append("attachments", file, file.name);
      }
      formData.append("contactId", data?.id as string);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await Services.attachmentsUpload(formData, (event: any) => {
        setAttUploadProgress(Math.round((100 * event.loaded) / event.total));
      });
      console.log(res);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setError(err.message as string);
      console.log(err);
    }
  }

  return (
    <>
      {error && <Alert type={WARNING_TYPES.ERROR} message={error} />}
      {attUploadProgress && attUploadProgress < 100 && (
        <Alert
          type={WARNING_TYPES.WARNING}
          message="Enviando arquivos, aguarde..."
        />
      )}
      <div className="mb-6 grid grid-cols-12 items-center justify-center">
        <div className="col-span-full flex w-full space-x-4 items-center justify-start p-4 border-b">
          <div>
            {data.avatar ? (
              <img
                className="w-16 h-16 rounded-full"
                src={`${process.env.NX_BUCKET_AVATAR_URL}${data.avatar}`}
                alt={data.name}
              />
            ) : (
              <span className="w-16 h-16 text-4xl rounded-full flex justify-center items-center text-center font-bold text-primary-500 bg-primary-50 hover:text-primary-900 hover:bg-primary-100 focus:outline-none focus:bg-primary-100 focus:ring-primary-900">
                {data.name ? getUserInitials(data.name) : "I"}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-full">
          <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="col-span-3 font-bold">Telefone</p>
            <p className="col-span-9">{data.phone}</p>
          </div>
          <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="col-span-3 font-bold">E-Mail</p>
            <p className="col-span-9">
              {data.email ? (
                <a href={`mailto:${data.email}`} className="underline">
                  {data.email}
                </a>
              ) : (
                <span>{data.email}</span>
              )}
            </p>
          </div>
          <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="col-span-3 font-bold">Endereço</p>
            {formatAddress()}
          </div>
          <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="col-span-3 font-bold">Descrição</p>
            <p className="col-span-9 whitespace-pre-line text-sm">
              {data.description}
            </p>
          </div>
          <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="col-span-3 font-bold">Notas</p>
            <div className="col-span-9">
              <div className="text-right mb-6">
                <button
                disabled={loading}
                className="px-4 py-2 text-sm text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500">
                  Adcionar Nota
                </button>
              </div>
              {notesList &&
                notesList.map((note, i) => (
                  <div key={i} className="border-b mb-4">
                    <div className="flex justify-between pb-2">
                      <p className="font-bold">{note.title}</p>
                      <p className="text-sm">{note.date}</p>
                    </div>
                    <p className="whitespace-pre-line mb-4 text-sm">
                      {note.content}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4">
            <p className="col-span-3 font-bold">Anexos</p>
            <div className="col-span-9 space-y-2 text-right">
              {!attUploadProgress || attUploadProgress === 100 ? (
                <button
                  disabled={loading}
                  onClick={() => setShowAttModal(!showAttModal)}
                  className="px-4 py-2 text-sm text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
                >
                  Adcionar Anexo
                </button>
              ) : (
                <h2 className="text-base font-bold mb-4">
                  Enviando arquivos, aguarde...
                </h2>
              )}
              {attUploadProgress && attUploadProgress < 100 && (
                <div className="w-full elative">
                  <div className="flex items-center justify-end">
                    <span className="text-xs font-semibold inline-block text-primary-500">
                      {attUploadProgress}%
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                    <div
                      style={{ width: `${attUploadProgress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                    ></div>
                  </div>
                </div>
              )}
              {AttachmentList.map((attachment, i) => (
                <AttachmentShow key={i} attachment={attachment} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showAttModal && (
        <AttachmentUploadModal
          maxSize={1024 * 1024 * 20} // 20 Mb
          maxNumberFiles={4}
          setShowModal={setShowAttModal}
          action={receiveAttFromModal}
        />
      )}
    </>
  );
}

export default Details;
