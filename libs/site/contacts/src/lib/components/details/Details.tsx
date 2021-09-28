import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserInitials, WARNING_TYPES } from "@iustitia/site/shared-utils";
import {
  Alert,
  FormatAddress,
  AttachmentFile,
  AttachmentShow,
  AttachmentUploadModal,
  NoteShow,
  NoteNewModal,
  ConfirmationModal,
  AlertInterface,
} from "@iustitia/site/shared-components";
import { SiteRoutes } from "@iustitia/react-routes";
import { ContactInterface, OfficeInterface, NoteInterface, AttachmentInterface } from "../../Contacts";
import {
  NoteServices,
  AttchmentServices
} from "@iustitia/site/services";

export interface DetailsProps {
  data: ContactInterface;
  offices?: OfficeInterface[];
  edit(): void;
}

export function Details({ data, offices, edit }: DetailsProps) {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: "",
    type: WARNING_TYPES.NONE,
    time: 3000,
  });

  const [notesList, setNotesList] = useState<NoteInterface[]>();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [editNote, setEditNote] = useState<NoteInterface>();
  const [selectedNote, setSelectedNote] = useState<NoteInterface>();
  const [confirmNote, setConfirmNote] = useState(false);

  const [attList, setAttList] = useState<AttachmentInterface[]>();
  const [showAttModal, setShowAttModal] = useState(false);
  const [attUploadProgress, setAttUploadProgress] = useState<number>();
  const [selectedAttchment, setSelectedAttchment] =
    useState<AttachmentInterface>();
  const [confirmAttchment, setConfirmAttchment] = useState(false);

  useEffect(() => {
    if (data.id) {
      getAllNotes(data.id);
      getAllAttachments(data.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  async function getAllNotes(id: string) {
    try {
      const notes = await NoteServices.getAll(id);
      setNotesList(notes as NoteServices.NoteInterface[]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      })
    }
  }

  async function getAllAttachments(id: string) {
    try {
      const atts = await AttchmentServices.getAll(id);
      setAttList(atts as AttchmentServices.AttachmentInterface[]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      })
    }
  }

  async function receiveNoteFromModal(note: NoteServices.NoteInterface) {
    if (!editNote?.id) {
      createNote(note);
    } else {
      updateNote(note);
    }
  }

  async function createNote(note:  NoteServices.NoteInterface) {
    setLoading(true);
    try {
      const ownerId = data.id as string;
      await NoteServices.create({ ...note, ownerId });
      await getAllNotes(ownerId);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      })
    }
  }

  async function updateNote(note: NoteServices.NoteInterface) {
    setLoading(true);
    try {
      await NoteServices.update({ ...editNote, ...note });
      await getAllNotes(data.id as string);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      })
    }
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
      formData.append("ownerId", data?.id as string);
      await AttchmentServices.create(
        formData,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (event: any) => {
          setAttUploadProgress(Math.round((100 * event.loaded) / event.total));
        }
      );
      getAllAttachments(data?.id as string);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      })
    }
  }

  useEffect(() => {
    if (editNote?.id) setShowNoteModal(true);
  }, [editNote]);

  useEffect(() => {
    if (selectedNote?.id) setConfirmNote(true);
    if (selectedAttchment?.id) setConfirmAttchment(true);
  }, [selectedNote, selectedAttchment]);

  async function deleteOneNote() {
    setLoading(true);
    try {
      await NoteServices.deleteOne(selectedNote?.id as string);
      getAllNotes(data?.id as string);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      })
    }
  }

  async function deleteOneAttachment() {
    setLoading(true);
    try {
      await AttchmentServices.deleteOne(
        selectedAttchment?.id as string
      );
      getAllAttachments(data?.id as string);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      })
    }
  }

  return (
    <>
      {showAlert.show && <Alert alert={showAlert} setAlert={setShowAlert} />}
      {attUploadProgress && attUploadProgress < 100 && (
        <Alert alert={{
          show: true,
          message: "Enviando arquivos, aguarde...",
          type: WARNING_TYPES.WARNING,
        }} setAlert={setShowAlert}
        />
      )}
      <div className="mb-6 grid grid-cols-12 items-center justify-center">
        <div className="col-span-full flex flex-col md:flex-row w-full items-center justify-start py-4 md:p-4 border-b">
          <div className="w-20">
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
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h2 className=" text-base md:text-2xl font-bold">{data.name}</h2>
              <button
                disabled={loading}
                onClick={() => edit()}
                className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="col-span-3 font-bold">Contato de</p>
            <p className="col-span-9">
              {data.userId && `Pessoal`}
              {data.officeId &&
                offices?.find((o) => o.id === data.officeId)?.name}
              {!data.userId && !data.officeId && `Geral`}
            </p>
          </div>
          {data.phone && (
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Telefone</p>
              <p className="col-span-9">{data.phone}</p>
            </div>
          )}
          {data.email && (
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
          )}
          {(data.address ||
            data.number ||
            data.complement ||
            data.neighborhood ||
            data.city ||
            data.state ||
            data.zip) && (
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Endereço</p>
              <FormatAddress
                address={data.address}
                number={data.number}
                complement={data.complement}
                neighborhood={data.neighborhood}
                city={data.city}
                state={data.state}
                zip={data.zip}
              />
            </div>
          )}
          {(data.companyId || data.position) && (
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Empresa</p>
              <p className="col-span-9">
                {data.position} {data.position && data.company && `em`}{" "}
                <Link
                  to={`${SiteRoutes.Companies}/${data.companyId}`}
                  className="underline"
                >
                  {data.company}
                </Link>
              </p>
            </div>
          )}
          {data.comments && (
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Observações</p>
              <p className="col-span-9 whitespace-pre-line text-sm">
                {data.comments}
              </p>
            </div>
          )}
          <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="col-span-3 font-bold">Notas</p>
            <div className="col-span-9">
              <div className="text-right mb-6">
                <button
                  onClick={() => setShowNoteModal(!showNoteModal)}
                  disabled={loading}
                  className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
                >
                  Adcionar Nota
                </button>
              </div>
              {notesList &&
                notesList.map((note, i) => (
                  <NoteShow
                    key={i}
                    note={note}
                    loading={loading}
                    setEditNote={setEditNote}
                    setSelectedNote={setSelectedNote}
                  />
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
                  className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
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
              {attList &&
                attList.map((att, i) => (
                  <AttachmentShow
                    key={i}
                    attachment={att}
                    loading={loading}
                    selectAttchment={setSelectedAttchment}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {showNoteModal && (
        <NoteNewModal
          setShowModal={setShowNoteModal}
          action={receiveNoteFromModal}
          editNote={editNote}
        />
      )}
      {showAttModal && (
        <AttachmentUploadModal
          maxSize={1024 * 1024 * 20} // 20 Mb
          maxNumberFiles={4}
          setShowModal={setShowAttModal}
          action={receiveAttFromModal}
        />
      )}
      {confirmNote && (
        <ConfirmationModal
          setConfirm={setConfirmNote}
          type={WARNING_TYPES.ERROR}
          title={`Excluir ${selectedNote?.title}?`}
          content={`Você tem certeza que quer excluir a nota ${selectedNote?.title}? Essa ação não poderá ser desfeita}.`}
          action={deleteOneNote}
        />
      )}
      {confirmAttchment && (
        <ConfirmationModal
          setConfirm={setConfirmAttchment}
          type={WARNING_TYPES.ERROR}
          title={`Excluir ${selectedAttchment?.name}?`}
          content={`Você tem certeza que quer excluir o anexo ${selectedAttchment?.name}? Essa ação não poderá ser desfeita}.`}
          action={deleteOneAttachment}
        />
      )}
    </>
  );
}

export default Details;