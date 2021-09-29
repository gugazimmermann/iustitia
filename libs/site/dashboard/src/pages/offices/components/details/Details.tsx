import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormatAddress,
  AvatarModal,
  ShowAvatars,
} from "@iustitia/site/shared-components";
import { SiteRoutes } from "@iustitia/react-routes";
import {
  OfficeServices,
  PeopleServices,
  ProfileServices,
} from "@iustitia/site/services";
import { OfficeInterface } from "../../Offices";
import { convertProfileToSimpleProfile } from "..";

export interface DetailsProps {
  data: OfficeInterface;
  setData(data: OfficeInterface): void;
  route: SiteRoutes;
  setActive(active: boolean): void;
  setConfirm(confirm: boolean): void;
}

export function Details({
  data,
  setData,
  route,
  setActive,
  setConfirm,
}: DetailsProps) {
  const history = useHistory();
  const [peopleList, setPeopleList] = useState<
    PeopleServices.SimpleUserInterface[]
  >([]);
  const [showManagersModal, setShowManagersModal] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState<
    PeopleServices.SimpleUserInterface[]
  >([]);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<
    PeopleServices.SimpleUserInterface[]
  >([]);

  useEffect(() => {
    getListOfPeople();
  }, []);

  async function getListOfPeople() {
    try {
      const res =
        (await PeopleServices.list()) as PeopleServices.SimpleUserInterface[];
      setPeopleList(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (data.managersOffice) addDataManagersToSelected(data.managersOffice);
    if (data.usersOffice) addDataUsersToSelected(data.usersOffice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.managersOffice]);

  function addDataManagersToSelected(
    managersOffice: ProfileServices.ProfileInterface[]
  ) {
    const managers = convertProfileToSimpleProfile(managersOffice)
    setSelectedManagers(managers);
  }

  function addDataUsersToSelected(
    usersOffice: ProfileServices.ProfileInterface[]
  ) {
    const users = convertProfileToSimpleProfile(usersOffice)
    setSelectedUsers(users);
  }

  function handleSelectManager(manager: PeopleServices.SimpleUserInterface) {
    let managersList = selectedManagers.slice(0);
    if (managersList.some((m) => m.id === manager.id))
      managersList = managersList.filter((m) => m.id !== manager.id);
    else managersList.push(manager);
    setSelectedManagers(managersList);
  }

  function handleSelectUser(user: PeopleServices.SimpleUserInterface) {
    let usersList = selectedUsers.slice(0);
    if (usersList.some((u) => u.id === user.id))
      usersList = usersList.filter((u) => u.id !== user.id);
    else usersList.push(user);
    setSelectedUsers(usersList);
  }

  async function handleSendManagers() {
    try {
      const res = (await OfficeServices.managers(
        data.id as string,
        selectedManagers
      )) as OfficeInterface;
      setData(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSendUsers() {
    try {
      const res = (await OfficeServices.users(
        data.id as string,
        selectedUsers
      )) as OfficeInterface;
      setData(res);
    } catch (err) {
      console.log(err);
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
    addDataManagersToSelected(
      data.managersOffice as ProfileServices.ProfileInterface[]
    );
    setShowManagersModal(false);
  }

  function handleModalCancelUsers() {
    addDataUsersToSelected(
      data.usersOffice as ProfileServices.ProfileInterface[]
    );
    setShowUsersModal(false);
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between py-2">
        <div className="flex space-x-2 justify-center md:justify-start mb-4 md:mb-0">
          <button
            type="button"
            onClick={() => history.push(`${route}/edit/${data?.id}`)}
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
          <button
            type="button"
            onClick={() => setActive(!data.active)}
            className={`px-2 py-1 text-xs text-white rounded-md ${
              data.active
                ? `bg-green-500 hover:bg-green-800 focus:ring-green-500`
                : `bg-gray-500 hover:bg-gray-800 focus:ring-gray-500`
            } `}
          >
            {data.active ? `Tornar Inativo` : `Tornar Ativo`}
          </button>
          <button
            type="button"
            onClick={() => setConfirm(true)}
            className="px-2 py-1 text-xs text-white rounded-md bg-red-500 hover:bg-red-900 focus:ring-red-500"
          >
            Remover
          </button>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded">
        <div className="mb-6 grid grid-cols-12 items-center justify-center">
          <div className="col-span-full flex flex-col md:flex-row w-full items-center justify-start py-4 md:p-4 border-b">
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold">{data.name}</h2>
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
                  className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
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
                  className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Contatos</p>
              <p className="col-span-9">{data.phone}</p>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Eventos</p>
              <p className="col-span-9">{data.phone}</p>
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
        />
      )}
    </>
  );
}

export default Details;
