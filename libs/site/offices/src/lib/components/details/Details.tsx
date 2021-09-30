import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormatAddress,
  AvatarModal,
  ShowAvatars,
  ConfirmationModal,
  AlertInterface,
  LoadingButton,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { SiteRoutes } from "@iustitia/react-routes";
import { OfficeServices, PeopleServices } from "@iustitia/site/services";
import { SimpleUserInterface } from "@iustitia/site/people";
import { ProfileInterface } from "@iustitia/site/dashboard";
import {
  OfficeInterface,
  OfficeModule,
  convertProfileToSimpleProfile,
} from "../../Offices";

export interface DetailsProps {
  loading: boolean;
  setLoading(loading: boolean): void;
  setShowAlert(showAlert: AlertInterface): void;
  data: OfficeInterface;
  setData(data: OfficeInterface): void;
  route: SiteRoutes;
  setConfirm(confirm: boolean): void;
}

export function Details({
  loading,
  setLoading,
  setShowAlert,
  data,
  setData,
  route,
  setConfirm,
}: DetailsProps) {
  const history = useHistory();
  const [confirmInative, setConfirmInative] = useState(false);
  const [peopleList, setPeopleList] = useState<SimpleUserInterface[]>([]);
  const [showManagersModal, setShowManagersModal] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState<
    SimpleUserInterface[]
  >([]);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<SimpleUserInterface[]>([]);

  async function handleActive() {
    setLoading(true);
    try {
      const res = (await OfficeServices.active({
        active: !data.active,
        officeId: data.id as string,
      })) as OfficeInterface;
      setData(res);
      setLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  useEffect(() => {
    getListOfPeople();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getListOfPeople() {
    setLoading(true);
    try {
      const res = (await PeopleServices.list()) as SimpleUserInterface[];
      setPeopleList(res);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  useEffect(() => {
    if (data.managersOffice) addDataManagersToSelected(data.managersOffice);
    if (data.usersOffice) addDataUsersToSelected(data.usersOffice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.managersOffice]);

  function addDataManagersToSelected(managersOffice: ProfileInterface[]) {
    const managers = convertProfileToSimpleProfile(managersOffice);
    setSelectedManagers(managers);
  }

  function addDataUsersToSelected(usersOffice: ProfileInterface[]) {
    const users = convertProfileToSimpleProfile(usersOffice);
    setSelectedUsers(users);
  }

  function handleSelectManager(manager: SimpleUserInterface) {
    let managersList = selectedManagers.slice(0);
    if (managersList.some((m) => m.id === manager.id))
      managersList = managersList.filter((m) => m.id !== manager.id);
    else managersList.push(manager);
    setSelectedManagers(managersList);
  }

  function handleSelectUser(user: SimpleUserInterface) {
    let usersList = selectedUsers.slice(0);
    if (usersList.some((u) => u.id === user.id))
      usersList = usersList.filter((u) => u.id !== user.id);
    else usersList.push(user);
    setSelectedUsers(usersList);
  }

  async function handleSendManagers() {
    setLoading(true);
    try {
      const res = (await OfficeServices.managers(
        data.id as string,
        selectedManagers
      )) as OfficeInterface;
      setData(res);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  async function handleSendUsers() {
    setLoading(true);
    try {
      const res = (await OfficeServices.users(
        data.id as string,
        selectedUsers
      )) as OfficeInterface;
      setData(res);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  function handleModalSendManagers() {
    handleSendManagers();
    setShowManagersModal(false);
  }

  function handleModalSendUsers() {
    handleSendUsers();
    setShowUsersModal(false);
  }

  function handleModalCancelManagers() {
    addDataManagersToSelected(data.managersOffice as ProfileInterface[]);
    setShowManagersModal(false);
  }

  function handleModalCancelUsers() {
    addDataUsersToSelected(data.usersOffice as ProfileInterface[]);
    setShowUsersModal(false);
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between py-2">
        <div className="flex space-x-2 justify-center md:justify-start mb-4 md:mb-0">
          <button
            type="button"
            onClick={() =>
              history.push(`${SiteRoutes.Dashboard}/escritorios/${data?.id}`)
            }
            className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => history.push(`${route}/edit/${data?.id}`)}
            className="px-2 py-1 text-xs text-white rounded-md bg-green-500 hover:bg-green-900 focus:ring-green-500"
          >
            Financeiro
          </button>
        </div>
        <div className="flex space-x-2  justify-center md:justify-end">
          <button
            type="button"
            onClick={() => history.push(`${route}/edit/${data?.id}`)}
            className="px-2 py-1 text-xs text-white rounded-md bg-yellow-500 hover:bg-yellow-900 focus:ring-yellow-500"
          >
            Editar
          </button>
          <LoadingButton
            styles={`px-2 py-1 text-xs text-white rounded-md ${
              data.active
                ? `bg-gray-500 hover:bg-gray-800 focus:ring-gray-500`
                : `bg-green-500 hover:bg-green-800 focus:ring-green-500`
            } `}
            loadingStyles="h-4 w-4"
            type="button"
            text={data.active ? `Tornar Inativo` : `Tornar Ativo`}
            loading={loading}
            action={() => setConfirmInative(true)}
          />
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
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold">
                  {data.name}
                  {!data.active && ` | Inativo`}
                </h2>
              </div>
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
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Responsáveis</p>
              <div className="col-span-9 flex justify-between">
                {<ShowAvatars toShow={selectedManagers} qtd={8} smallQtd={5} />}
                <button
                  type="button"
                  onClick={() => setShowManagersModal(true)}
                  className={`p-2 py-1 text-xs rounded-md ${data.active ? `text-white bg-primary-500 hover:bg-primary-900 focus:ring-primary-500` : `text-white bg-gray-500`}`}
                  disabled={!data.active}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Usuários</p>
              <div className="col-span-9 flex justify-between">
                {<ShowAvatars toShow={selectedUsers} qtd={8} smallQtd={5} />}
                <button
                  type="button"
                  onClick={() => setShowUsersModal(true)}
                  className={`p-2 py-1 text-xs rounded-md ${data.active ? `text-white bg-primary-500 hover:bg-primary-900 focus:ring-primary-500` : `text-white bg-gray-500`}`}
                  disabled={!data.active}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Contatos</p>
              <p className="col-span-9"></p>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Eventos</p>
              <p className="col-span-9"></p>
            </div>
          </div>
        </div>
      </div>
      {showManagersModal && (
        <AvatarModal
          title="Selecione os Responsáveis"
          peopleList={peopleList}
          currentList={selectedManagers}
          handleSelect={handleSelectManager}
          cancel={handleModalCancelManagers}
          submit={handleModalSendManagers}
          submitText="Salvar Responsáveis"
          open={showManagersModal}
          setOpen={setShowManagersModal}
        />
      )}
      {showUsersModal && (
        <AvatarModal
          title="Selecione os Usuários"
          peopleList={peopleList}
          currentList={selectedUsers}
          handleSelect={handleSelectUser}
          cancel={handleModalCancelUsers}
          submit={handleModalSendUsers}
          submitText="Salvar Usuários"
          open={showUsersModal}
          setOpen={setShowUsersModal}
        />
      )}
      {confirmInative && (
        <ConfirmationModal
          setConfirm={setConfirmInative}
          type={WARNING_TYPES.WARNING}
          title={`Tornar ${data.name} ${data.active ? `inativo` : `ativo`}?`}
          content={`Você tem certeza que quer tonar o ${
            OfficeModule.singular
          } ${data.name} ${data.active ? `inativo` : `ativo`}?`}
          buttonText={`Sim, tornar ${data.active ? `inativo` : `ativo`}`}
          action={handleActive}
        />
      )}
    </>
  );
}

export default Details;
