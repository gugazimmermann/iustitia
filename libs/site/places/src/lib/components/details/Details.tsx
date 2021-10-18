import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormatAddress,
  AvatarModal,
  ConfirmationModal,
  AlertInterface,
  LoadingButton,
  AvatarList,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import {
  GetModule,
  ModulesEnum,
  ModulesInterface,
  GetRoutes,
  PlacesRoutesInterface,
  DashboardsRoutesInterface,
} from "@iustitia/modules";
import {
  PlacesServices,
  MembersServices,
  BusinessContactsServices,
} from "@iustitia/site/services";

const placesModule = GetModule(ModulesEnum.places) as ModulesInterface;
const placesRoutes = GetRoutes(ModulesEnum.places) as PlacesRoutesInterface;

const dashboardsRoutes = GetRoutes(
  ModulesEnum.dashboards
) as DashboardsRoutesInterface;

type PlacesType = PlacesServices.PlacesRes;
type ProfilesListType = PlacesServices.ProfilesListRes;
type BCPersonsType = BusinessContactsServices.BCPersonsRes;

export interface DetailsProps {
  loading: boolean;
  setLoading(loading: boolean): void;
  setShowAlert(showAlert: AlertInterface): void;
  data: PlacesType;
  setData(data: PlacesType): void;
  setConfirm(confirm: boolean): void;
}

export function Details({
  loading,
  setLoading,
  setShowAlert,
  data,
  setData,
  setConfirm,
}: DetailsProps) {
  const history = useHistory();
  const [confirmInative, setConfirmInative] = useState(false);

  const [membersList, setMembersList] = useState<ProfilesListType[]>([]);
  const [showManagersModal, setShowManagersModal] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState<ProfilesListType[]>(
    []
  );
  const [showEmployeesModal, setShowEmployeesModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<
    ProfilesListType[]
  >([]);

  const [showClientsModal, setShowClientsModal] = useState(false);
  const [selectedClients, setSelectedClients] = useState<BCPersonsType[]>([]);
  const [showSupliersModal, setShowSupliersModal] = useState(false);
  const [selectedSupliers, setSelectedSupliers] = useState<BCPersonsType[]>([]);
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<BCPersonsType[]>([]);

  async function handleActive() {
    setLoading(true);
    try {
      const res = (await PlacesServices.active({
        active: !data.active,
        placeId: data.id as string,
      })) as PlacesType;
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

  useEffect(() => {
    getMembersList();
    getBusinessContacts();
  }, []);

  async function getMembersList() {
    setLoading(true);
    try {
      const res = (await MembersServices.getAll()) as ProfilesListType[];
      setMembersList(res);
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

  async function getBusinessContacts() {
    setLoading(true);
    try {
      const clients = (await BusinessContactsServices.getAllPersons({
        type: "Clientes",
      })) as BCPersonsType[];
      const supliers = (await BusinessContactsServices.getAllPersons({
        type: "Fornecedores",
      })) as BCPersonsType[];
      const contacts = (await BusinessContactsServices.getAllPersons({
        type: "Contatos",
      })) as BCPersonsType[];
      // const placeClients = clients.filter((c) => c.placeId === data.id);
      setSelectedClients(clients);
      // const placeSupliers = clients.filter((c) => c.placeId === data.id);
      setSelectedSupliers(supliers);
      // const placeContacts = clients.filter((c) => c.placeId === data.id);
      setSelectedContacts(contacts);
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

  useEffect(() => {
    if (data.managersPlace) setSelectedManagers(data.managersPlace);
    if (data.employeesPlace) setSelectedEmployees(data.employeesPlace);
  }, [data]);

  function ManagerOrEmployee(member: ProfilesListType, type: string) {
    if (type === "manager") {
      if (selectedEmployees.some((u) => u.id === member.id)) {
        let usersList = selectedEmployees.slice(0);
        usersList = usersList.filter((u) => u.id !== member.id);
        setSelectedEmployees(usersList);
      }
    } else {
      if (selectedManagers.some((u) => u.id === member.id)) {
        let managersList = selectedManagers.slice(0);
        managersList = managersList.filter((u) => u.id !== member.id);
        setSelectedManagers(managersList);
      }
    }
  }

  function handleSelectManager(manager: ProfilesListType) {
    let managersList = selectedManagers.slice(0);
    if (managersList.some((m) => m.id === manager.id))
      managersList = managersList.filter((m) => m.id !== manager.id);
    else {
      managersList.push(manager);
      ManagerOrEmployee(manager, "manager");
    }
    setSelectedManagers(managersList);
  }

  function handleSelectEmployee(employee: ProfilesListType) {
    let employeesList = selectedEmployees.slice(0);
    if (employeesList.some((u) => u.id === employee.id))
      employeesList = employeesList.filter((u) => u.id !== employee.id);
    else {
      employeesList.push(employee);
      ManagerOrEmployee(employee, "employee");
    }
    setSelectedEmployees(employeesList);
  }

  async function sendManagersAndEmployees() {
    setLoading(true);
    setShowManagersModal(false);
    setShowEmployeesModal(false);
    try {
      await PlacesServices.managers({
        placeId: data.id as string,
        managersList: selectedManagers,
      });
      const res = (await PlacesServices.users({
        placeId: data.id as string,
        usersList: selectedEmployees,
      })) as PlacesType;
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

  function cancelModalManagersAndEmployees() {
    setSelectedManagers(data.managersPlace as ProfilesListType[]);
    setSelectedEmployees(data.employeesPlace as ProfilesListType[]);
    setShowManagersModal(false);
    setShowEmployeesModal(false);
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between py-2">
        <div className="flex space-x-2 justify-center md:justify-start mb-4 md:mb-0">
          <button
            type="button"
            onClick={() =>
              history.push(`${dashboardsRoutes.places}/${data?.id}`)
            }
            className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => history.push(`${placesRoutes.update}/${data?.id}`)}
            className="px-2 py-1 text-xs text-white rounded-md bg-green-500 hover:bg-green-900 focus:ring-green-500"
          >
            Financeiro
          </button>
        </div>
        <div className="flex space-x-2  justify-center md:justify-end">
          <button
            type="button"
            onClick={() => history.push(`${placesRoutes.update}/${data?.id}`)}
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
                {<AvatarList toShow={selectedManagers} qtd={8} smallQtd={5} />}
                <button
                  type="button"
                  onClick={() => setShowManagersModal(true)}
                  className={`p-2 py-1 text-xs rounded-md ${
                    data.active
                      ? `text-white bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
                      : `text-white bg-gray-500`
                  }`}
                  disabled={!data.active}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Colaboradores</p>
              <div className="col-span-9 flex justify-between">
                {<AvatarList toShow={selectedEmployees} qtd={8} smallQtd={5} />}
                <button
                  type="button"
                  onClick={() => setShowEmployeesModal(true)}
                  className={`p-2 py-1 text-xs rounded-md ${
                    data.active
                      ? `text-white bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
                      : `text-white bg-gray-500`
                  }`}
                  disabled={!data.active}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Clientes</p>
              <div className="col-span-9 flex justify-between">
                {<AvatarList toShow={selectedEmployees} qtd={8} smallQtd={5} />}
                <button
                  type="button"
                  onClick={() => setShowEmployeesModal(true)}
                  className={`p-2 py-1 text-xs rounded-md ${
                    data.active
                      ? `text-white bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
                      : `text-white bg-gray-500`
                  }`}
                  disabled={!data.active}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Fornecedores</p>
              <div className="col-span-9 flex justify-between">
                {<AvatarList toShow={selectedEmployees} qtd={8} smallQtd={5} />}
                <button
                  type="button"
                  onClick={() => setShowEmployeesModal(true)}
                  className={`p-2 py-1 text-xs rounded-md ${
                    data.active
                      ? `text-white bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
                      : `text-white bg-gray-500`
                  }`}
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
              <div className="col-span-9 flex justify-between">
                {<AvatarList toShow={selectedEmployees} qtd={8} smallQtd={5} />}
                <button
                  type="button"
                  onClick={() => setShowEmployeesModal(true)}
                  className={`p-2 py-1 text-xs rounded-md ${
                    data.active
                      ? `text-white bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
                      : `text-white bg-gray-500`
                  }`}
                  disabled={!data.active}
                >
                  Adicionar
                </button>
              </div>
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
          membersList={membersList}
          currentList={selectedManagers}
          handleSelect={handleSelectManager}
          cancel={cancelModalManagersAndEmployees}
          submit={sendManagersAndEmployees}
          submitText="Salvar Responsáveis"
          open={showManagersModal}
          setOpen={setShowManagersModal}
        />
      )}
      {showEmployeesModal && (
        <AvatarModal
          title="Selecione os Usuários"
          membersList={membersList}
          currentList={selectedEmployees}
          handleSelect={handleSelectEmployee}
          cancel={cancelModalManagersAndEmployees}
          submit={sendManagersAndEmployees}
          submitText="Salvar Usuários"
          open={showEmployeesModal}
          setOpen={setShowEmployeesModal}
        />
      )}
      {confirmInative && (
        <ConfirmationModal
          setConfirm={setConfirmInative}
          type={WARNING_TYPES.WARNING}
          title={`Tornar ${data.name} ${data.active ? `inativo` : `ativo`}?`}
          content={`Você tem certeza que quer tonar o ${
            placesModule.singular
          } ${data.name} ${data.active ? `inativo` : `ativo`}?`}
          buttonText={`Sim, tornar ${data.active ? `inativo` : `ativo`}`}
          action={handleActive}
        />
      )}
    </>
  );
}

export default Details;
