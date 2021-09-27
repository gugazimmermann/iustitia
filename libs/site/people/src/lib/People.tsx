import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Alert,
  AlertInterface,
  Callout,
  ConfirmationModal,
  Header,
  SearchIcon,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import {
  ProfileServices,
  OfficeServices,
  PeopleServices,
} from "@iustitia/site/services";
import { Details, Form, List, ListInvites } from "./components";
import { bool } from "yup";

export const { route, singular, parents, plural } = PeopleServices.PeopleModule;
export type PeopleInterface = PeopleServices.PeopleInterface;
type ProfileInterface = ProfileServices.ProfileInterface;

interface PeopleProps {
  profile?: ProfileServices.ProfileInterface;
  offices?: OfficeServices.OfficeInterface[];
  setOffices?(offices: OfficeServices.OfficeInterface[]): void;
}

export function People({ profile, offices, setOffices }: PeopleProps) {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const [showList, setShowList] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdade] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: "",
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const [back, setBack] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [dataList, setDataList] = useState([] as ProfileInterface[]);
  const [showDataList, setShowDataList] = useState([] as ProfileInterface[]);
  const [selected, setSelected] = useState({} as ProfileInterface);
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState("ASC");
  const [invitesList, setInvitesList] = useState([] as PeopleInterface[]);
  const [selectedInvite, setSelectedInvite] = useState({} as PeopleInterface);
  const [inviteSendConfirm, setInviteSendConfirm] = useState(false);
  const [inviteDeleteConfirm, setInviteDeleteConfirm] = useState(false);

  useEffect(() => {
    if (pathname.includes("add")) {
      setBack(true);
      setShowList(false);
      setShowDetails(false);
      setShowUpdade(false);
      setShowCreate(true);
    } else if (pathname.includes("edit")) {
      getSelected(id);
      setBack(true);
      setShowList(false);
      setShowDetails(false);
      setShowUpdade(true);
      setShowCreate(false);
    } else {
      if (id) {
        getSelected(id);
        setBack(true);
        setShowList(false);
        setShowDetails(true);
        setShowUpdade(false);
        setShowCreate(false);
      } else {
        setBack(false);
        setShowList(true);
        setShowDetails(false);
        setShowUpdade(false);
        setShowCreate(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pathname]);

  useEffect(() => {
    getDataList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offices]);

  async function getSelected(id: string) {
    try {
      const data = (await PeopleServices.getOne(id)) as ProfileInterface;
      setSelected(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      history.push(route);
    }
  }

  async function reloadList() {
    await getDataList();
    setShowList(true);
    setShowDetails(false);
    setShowUpdade(false);
    setShowCreate(false);
    setBack(false);
  }

  useEffect(() => {
    handleSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  function handleSort(data?: ProfileInterface[]) {
    if (data?.length) {
      const sortData = data ? data : dataList.slice(0);
      if (sortData) {
        if (sort === "ASC")
          sortData.sort((a, b) =>
            (a.name as string).localeCompare(b.name as string)
          );
        if (sort === "DESC")
          sortData.sort((a, b) =>
            (b.name as string).localeCompare(a.name as string)
          );
      }
      setShowDataList(sortData);
    } else {
      setShowDataList([]);
    }
  }

  const createSearch = () => {
    return (
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <SearchIcon styles="h-6 h-6 text-gray-500" />
        </span>
        <input
          type="search"
          name="search"
          className="py-2 pl-10 rounded-md text-sm focus:ring-0 focus:ring-opacity-75 text-gray-900 focus:ring-primary-500 border-gray-300"
          placeholder="Procurar..."
          autoComplete="off"
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </div>
    );
  };

  useEffect(() => {
    const data = dataList.length ? dataList.slice(0) : [];
    if (searchParam) {
      handleSearch(data, searchParam);
    } else {
      setShowDataList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  function handleSearch(data: ProfileInterface[], param: string) {
    const res = data.filter((d) => d.name?.includes(param));
    setShowDataList(res);
  }

  const createButton = (state: boolean) => {
    return (
      <button
        onClick={() => {
          if (back) {
            if (location.pathname !== route) history.push(route);
            else reloadList();
          } else history.push(`${route}/add`);
        }}
        className={`px-4 py-2 text-sm text-white rounded-md ${
          state
            ? `bg-secondary-500 hover:bg-secondary-700 `
            : `bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
        }`}
      >
        {back ? "Listagem" : "Adicionar"}
      </button>
    );
  };

  async function getDataList() {
    try {
      const data = (await PeopleServices.getAll()) as ProfileInterface[];
      const invitesData =
        (await PeopleServices.getInvites()) as PeopleInterface[];
      setDataList(data);
      handleSort(data);
      setInvitesList(invitesData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  }

  function handleEdit() {
    history.push(`${route}/edit/${selected?.id}`);
  }

  async function handleDelete() {
    if (selected.id) {
      setLoading(true);
      try {
        await OfficeServices.deleteOne(selected.id);
        reloadList();
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  async function handleCreateInvite(data: PeopleInterface) {
    setLoading(true);
    try {
      (await PeopleServices.createInvite(data)) as PeopleInterface;
      setShowAlert({
        show: true,
        message: "Convite enviado com sucesso!",
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      await reloadList();
      history.push(route);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  async function handleInviteSend() {
    setLoading(true);
    try {
      await PeopleServices.sendInvite(selectedInvite.id as string);
      await getDataList();
      setShowAlert({
        show: true,
        message: "Convite enviado com sucesso!",
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  async function handleInviteDelete() {
    if (selectedInvite.id) {
      setLoading(true);
      try {
        await PeopleServices.deleteInvite(selectedInvite.id);
        setShowAlert({
          show: true,
          message: "Convite removido com sucesso!",
          type: WARNING_TYPES.SUCCESS,
          time: 3000,
        });
        reloadList();
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  return (
    <div className="mb-10">
      <Header
        before={parents}
        main={plural}
        search={
          profile?.isProfessional && showDataList.length > 0
            ? createSearch
            : undefined
        }
        button={
          profile?.isAdmin &&
          !profile?.isProfessional &&
          (showDataList.length > 0 || invitesList.length > 0)
            ? undefined
            : createButton
        }
        back={back}
      />
      <div className="flex items-center justify-center overflow-hidden p-2">
        <div className="w-full">
          <div className="bg-white shadow-sm rounded">
            {showAlert && <Alert alert={showAlert} setAlert={setShowAlert} />}
            {showList && showDataList.length > 0 && (
              <List
                dataList={showDataList}
                sort={sort}
                setSort={setSort}
                setSelected={setSelected}
                setConfirm={setConfirm}
                profile={profile as ProfileInterface}
              />
            )}
            {showList && showDataList.length === 0 && (
              <Callout
                title={`Nenhuma ${singular} Cadastrada`}
                type={WARNING_TYPES.INFO}
              />
            )}
            {showList && invitesList.length > 0 && (
              <ListInvites
                dataList={invitesList}
                setSelected={setSelectedInvite}
                setSendConfirm={setInviteSendConfirm}
                setDeleteConfirm={setInviteDeleteConfirm}
              />
            )}
            {showDetails && <Details data={selected} edit={handleEdit} />}
            {showCreate && (
              <Form loading={loading} create={handleCreateInvite} />
            )}
            {showUpdate && <Form loading={loading} />}
            {confirm && (
              <ConfirmationModal
                setConfirm={setConfirm}
                type={WARNING_TYPES.ERROR}
                title={`Excluir ${singular}: ${selected.name}?`}
                content={`Você tem certeza que quer excluir o ${singular} ${selected.name}? Todos os dados desse ${singular} serão perdidos. Essa ação não poderá ser desfeita.`}
                action={handleDelete}
              />
            )}
            {inviteSendConfirm && (
              <ConfirmationModal
                setConfirm={setInviteSendConfirm}
                type={WARNING_TYPES.INFO}
                title={`Reenviar convite para: ${selectedInvite.email}?`}
                content={`Você tem certeza que quer reenviar o convite para ${selectedInvite.name}?`}
                buttonText={`Sim, Enviar`}
                action={handleInviteSend}
              />
            )}
            {inviteDeleteConfirm && (
              <ConfirmationModal
                setConfirm={setInviteDeleteConfirm}
                type={WARNING_TYPES.ERROR}
                title={`Excluir convite para: ${selectedInvite.email}?`}
                content={`Você tem certeza que quer excluir o convite para ${selectedInvite.name}?`}
                buttonText={`Sim, Excluir`}
                action={handleInviteDelete}
              />
            )}
          </div>
          {!profile?.isProfessional && (
            <div className="text-xs text-gray-400 text-right">
              Somente 1 {singular} permitida no Plano Básico
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default People;
