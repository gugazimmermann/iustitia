import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
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
  LoadingButton,
  AvatarOrInitial,
  OwnersModal,
} from "@iustitia/site/shared-components";
import { ModulesEnum, GetRoutes, BCRoutesInterface } from "@iustitia/modules";
import {
  BusinessContactsServices as BCServices,
  AttachmentsServices,
  BusinessContactsServices,
  NotesServices,
  PlacesServices,
  ProfilesServices,
} from "@iustitia/site/services";
import { seeType, seeTypeText } from "../../utils";

const BCRoutes = GetRoutes(ModulesEnum.businessContacts) as BCRoutesInterface;

type BCTypes = BusinessContactsServices.BCTypes;
type BCPersonsType = BusinessContactsServices.BCPersonsRes;
type OnwersListType = BusinessContactsServices.OnwersListRes;
type NotesType = NotesServices.NotesRes;
type AttachmentsType = AttachmentsServices.AttachmentsRes;
type ProfilesType = ProfilesServices.ProfilesRes;
type ProfilesListType = PlacesServices.ProfilesListRes;
type PlacesType = PlacesServices.PlacesRes;

export interface DetailsProps {
  loading: boolean;
  setLoading(loading: boolean): void;
  setShowAlert(showAlert: AlertInterface): void;
  data: BCPersonsType | undefined;
  setData(data: BCPersonsType): void;
  setConfirm(confirm: boolean): void;
  profile: ProfilesType;
  places: PlacesType[];
  members: ProfilesListType[];
}

export function Details({
  loading,
  setLoading,
  setShowAlert,
  data,
  setData,
  setConfirm,
  profile,
  places,
  members,
}: DetailsProps) {
  const history = useHistory();
  const { pathname } = useLocation();
  const [selectedType, setSelectedType] = useState<BCTypes>();

  const [ownersList, setOwnersList] = useState<OnwersListType[]>([]);
  const [showOwnersModal, setShowOwnersModal] = useState(false);

  const [notesList, setNotesList] = useState<NotesType[]>();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [editNote, setEditNote] = useState<NotesType>();
  const [selectedNote, setSelectedNote] = useState<NotesType>();
  const [confirmNote, setConfirmNote] = useState(false);

  const [attList, setAttList] = useState<AttachmentsType[]>();
  const [showAttModal, setShowAttModal] = useState(false);
  const [attUploadProgress, setAttUploadProgress] = useState<number>();
  const [selectedAttchment, setSelectedAttchment] = useState<AttachmentsType>();
  const [confirmAttchment, setConfirmAttchment] = useState(false);

  useEffect(() => {
    setSelectedType(seeType(pathname));
    getAllNotes(data?.id);
    getAllAttachments(data?.id);
    setOwnersList(data?.onwers as OnwersListType[]);
  }, [data]);

  function handleSelectOwner(owner: OnwersListType) {
    let oList = ownersList.slice(0);
    if (oList.some((o) => o.id === owner.id))
      oList = oList.filter((o) => o.id !== owner.id);
    else {
      oList.push(owner);
    }
    setOwnersList(oList);
  }

  async function sendOwners() {
    setLoading(true);
    setShowOwnersModal(false);
    try {
      const res = (await BCServices.changePersonOwner({
        id: data?.id as string,
        owners: ownersList,
      })) as BCPersonsType;
      setData(res);
      setLoading(false);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
    }
  }

  function cancelOwnersModal() {
    setOwnersList(data?.onwers as OnwersListType[]);
    setShowOwnersModal(false);
  }

  useEffect(() => {
    if (editNote?.id) setShowNoteModal(true);
  }, [editNote]);

  useEffect(() => {
    if (selectedNote?.id) setConfirmNote(true);
    if (selectedAttchment?.id) setConfirmAttchment(true);
  }, [selectedNote, selectedAttchment]);

  async function getAllNotes(id: string | undefined) {
    if (id) {
      try {
        const notes = await NotesServices.getAll({ ownerId: id });
        setNotesList(notes as NotesType[]);
      } catch (err: any) {
        setShowAlert({
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
      }
    }
  }

  async function receiveNoteFromModal(note: NotesType) {
    if (!editNote?.id) {
      createNote(note);
    } else {
      updateNote(note);
    }
  }

  async function createNote(note: NotesType) {
    if (data?.id) {
      setLoading(true);
      try {
        const ownerId = data.id;
        await NotesServices.create({ formData: { ...note, ownerId } });
        await getAllNotes(ownerId);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setShowAlert({
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
      }
    }
  }

  async function updateNote(note: NotesType) {
    setLoading(true);
    try {
      await NotesServices.update({ formData: { ...editNote, ...note } });
      await getAllNotes(data?.id);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  }

  async function deleteOneNote() {
    if (selectedNote?.id && data?.id) {
      setLoading(true);
      try {
        await NotesServices.deleteOne({ id: selectedNote.id });
        getAllNotes(data.id);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setShowAlert({
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
      }
    }
  }

  async function getAllAttachments(id: string | undefined) {
    if (id) {
      try {
        const atts = await AttachmentsServices.getAll({ ownerId: id });
        setAttList(atts as AttachmentsType[]);
      } catch (err: any) {
        setShowAlert({
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
      }
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
    if (data?.id) {
      try {
        const formData = new FormData();
        for (const file of files) {
          formData.append("attachments", file, file.name);
        }
        formData.append("ownerId", data.id);
        await AttachmentsServices.create({
          formData,
          onUploadProgress: (event: any) => {
            setAttUploadProgress(
              Math.round((100 * event.loaded) / event.total)
            );
          },
        });
        getAllAttachments(data.id);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setShowAlert({
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
      }
    }
  }

  async function deleteOneAttachment() {
    if (selectedAttchment?.id && data?.id) {
      setLoading(true);
      try {
        await AttachmentsServices.deleteOne({
          id: selectedAttchment.id,
        });
        getAllAttachments(data.id);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setShowAlert({
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
      }
    }
  }

  return !data ? null : (
    <>
      {attUploadProgress && attUploadProgress < 100 && (
        <Alert
          alert={{
            show: true,
            message: "Enviando arquivos, aguarde...",
            type: WARNING_TYPES.WARNING,
          }}
          setAlert={setShowAlert}
        />
      )}
      <div className="flex flex-col md:flex-row justify-between py-2">
        <div></div>
        <div className="flex space-x-2  justify-center md:justify-end">
          <button
            type="button"
            onClick={() => history.push(`${BCRoutes.updatePerson}/${data?.id}`)}
            className="px-2 py-1 text-xs text-white rounded-md bg-yellow-500 hover:bg-yellow-900 focus:ring-yellow-500"
          >
            Editar
          </button>
          <LoadingButton
            styles="px-2 py-1 text-xs text-white rounded-md bg-red-500 hover:bg-red-900 focus:ring-red-500"
            loadingStyles="h-4 w-4"
            type="button"
            text="Remover"
            loading={loading}
            action={() => setConfirm(true)}
          />
        </div>
      </div>
      <div className="bg-white shadow-sm rounded">
        <div className="mb-6 grid grid-cols-12 items-center justify-center">
          <div className="col-span-full flex flex-col md:flex-row w-full items-center justify-start py-4 md:p-4 border-b">
            <div className="w-14">
              <AvatarOrInitial
                avatar={data.avatar}
                name={data.name}
                avatarStyle="h-12 w-12"
                initialStyle="h-10 w-10"
              />
            </div>
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <h2 className=" text-base md:text-2xl font-bold">
                  {data.name}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <div className="col-span-2 font-bold">
                {seeTypeText(data.type)} de
              </div>
              <div className="col-span-10 flex justify-between">
                <p>
                  {data.onwers && data.onwers.map((o) => o.name).join(", ")}
                </p>

                <button
                  onClick={() => setShowOwnersModal(!showOwnersModal)}
                  disabled={loading}
                  className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
                >
                  Alterar Propriedade
                </button>
              </div>
            </div>
            {data.phone && (
              <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="col-span-2 font-bold">Telefone</p>
                <p className="col-span-10">{data.phone}</p>
              </div>
            )}
            {data.email && (
              <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="col-span-2 font-bold">E-Mail</p>
                <p className="col-span-10">
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
                <p className="col-span-2 font-bold">Endereço</p>
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
                <p className="col-span-2 font-bold">Empresa</p>
                <p className="col-span-10">
                  {data.position} {data.position && data.company && `em`}{" "}
                  <Link
                    to={`${BCRoutes.detailsCompany}/${data.companyId}`}
                    className="underline"
                  >
                    {data.company}
                  </Link>
                </p>
              </div>
            )}
            {data.comments && (
              <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="col-span-2 font-bold">Observações</p>
                <p className="col-span-10 whitespace-pre-line text-sm">
                  {data.comments}
                </p>
              </div>
            )}
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-2 font-bold">Notas</p>
              <div className="col-span-10">
                <div className="text-right mb-6">
                  <button
                    onClick={() => setShowNoteModal(!showNoteModal)}
                    disabled={loading}
                    className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
                  >
                    Adicionar Nota
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
              <p className="col-span-2 font-bold">Anexos</p>
              <div className="col-span-10 space-y-2 text-right">
                {!attUploadProgress || attUploadProgress === 100 ? (
                  <button
                    disabled={loading}
                    onClick={() => setShowAttModal(!showAttModal)}
                    className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
                  >
                    Adicionar Anexo
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
      </div>
      {showOwnersModal && (
        <OwnersModal
          title="Selecione os Proprietarios"
          membersList={members}
          placesList={places}
          currentList={ownersList}
          handleSelect={handleSelectOwner}
          cancel={cancelOwnersModal}
          submit={sendOwners}
          submitText="Salvar Proprietarios"
          open={showOwnersModal}
          setOpen={setShowOwnersModal}
        />
      )}
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
