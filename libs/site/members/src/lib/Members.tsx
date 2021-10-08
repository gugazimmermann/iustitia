import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  AddButton,
  Alert,
  AlertInterface,
  BasicPlanMsg,
  ConfirmationModal,
  Header,
  SearchField,
} from "@iustitia/site/shared-components";
import { Sort, WARNING_TYPES } from "@iustitia/site/shared-utils";
import { List, Form, ListInvites } from "./components";
import {
  GetModule,
  ModulesEnum,
  ModulesInterface,
  GetRoutes,
  MembersRoutesInterface,
} from "@iustitia/modules";
import {
  ProfilesServices,
  MembersServices,
} from "@iustitia/site/services";

const membersModule = GetModule(ModulesEnum.members) as ModulesInterface;
const membersRoutes = GetRoutes(ModulesEnum.members) as MembersRoutesInterface;

type MembersType = MembersServices.MembersRes;
type MembersSimpleType = MembersServices.MembersSimpleRes;
type ProfilesType = ProfilesServices.ProfilesRes;

interface MembersProps {
  profile?: ProfilesType;
}

export function Members({ profile }: MembersProps) {
  const history = useHistory();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: "",
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const [whatToShow, setWhatToShow] = useState<"list" | "create">();
  const [dataList, setDataList] = useState([] as MembersSimpleType[]);
  const [dataListInvite, setDataListInvite] = useState([] as MembersType[]);
  const [showDataList, setShowDataList] = useState([] as MembersSimpleType[]);
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  const [selectedInvite, setSelectedInvite] = useState({} as MembersType);
  const [sendInviteConfirm, setSendInviteConfirm] = useState(false);
  const [deleteInviteConfirm, setDeleteInviteConfirm] = useState(false);

  useEffect(() => {
    if (pathname.includes("adicionar")) {
      setWhatToShow("create");
    } else {
      getDataList();
      setWhatToShow("list");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pathname]);

  async function reloadList() {
    await getDataList();
    setWhatToShow("list");
  }

  async function getDataList() {
    setLoading(true);
    try {
      const data = (await MembersServices.getAll()) as MembersSimpleType[];
      setDataList(data);
      const sortedData = Sort(data.slice(0), sort);
      setShowDataList(sortedData);
      const dataInvites = (await MembersServices.getInvites()) as MembersType[];
      setDataListInvite(dataInvites);
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

  useEffect(() => {
    const sortedData = Sort(dataList.slice(0), sort);
    setShowDataList(sortedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    const data = dataList.length ? dataList.slice(0) : [];
    if (searchParam) {
      const res = data.filter((d) =>
        d.name.toLocaleLowerCase().includes(searchParam.toLocaleLowerCase())
      );
      setShowDataList(res);
    } else {
      setShowDataList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  async function handleCreateInvite(data: { name: string; email: string }) {
    setLoading(true);
    try {
      const newInvite = (await MembersServices.createInvite({
        formData: data,
      })) as MembersType;
      setShowAlert({
        show: true,
        message: `${membersModule.singular} cadastrada com sucesso!`,
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      await getDataList();
      history.push(membersRoutes.list);
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

  async function handleInviteReSend() {
    setLoading(true);
    try {
      await MembersServices.sendInvite({ id: selectedInvite.id as string });
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

  async function handleDeleteInvite() {
    if (selectedInvite.id) {
      setLoading(true);
      try {
        await MembersServices.deleteInvite({ id: selectedInvite.id });
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

  const createSearch = () => {
    return <SearchField setSearchParam={setSearchParam} />;
  };

  function createButton() {
    return (
      <AddButton
        back={whatToShow !== "list"}
        backRoute={membersRoutes.list}
        addRoute={membersRoutes.add}
        reload={reloadList}
        isProfessional={profile?.isProfessional}
      />
    );
  }

  return (
    <div className="container mx-auto">
      <Header
        before={[]}
        main={membersModule.plural}
        search={createSearch}
        button={createButton}
        back={whatToShow !== "list"}
      />
      <div className="flex items-center justify-center overflow-hidden p-2">
        <div className="w-full">
          {showAlert.show && (
            <Alert alert={showAlert} setAlert={setShowAlert} />
          )}
          {whatToShow === "create" && (
            <Form loading={loading} create={handleCreateInvite} />
          )}
          {whatToShow === "list" && (
            <>
              <List dataList={showDataList} sort={sort} setSort={setSort} />
              <ListInvites
                dataList={dataListInvite}
                setSelected={setSelectedInvite}
                setSendConfirm={setSendInviteConfirm}
                setDeleteConfirm={setDeleteInviteConfirm}
              />
            </>
          )}
          {sendInviteConfirm && (
            <ConfirmationModal
              setConfirm={setSendInviteConfirm}
              type={WARNING_TYPES.INFO}
              title={`Reenviar convite para: ${selectedInvite.email}?`}
              content={`Você tem certeza que quer reenviar o convite para ${selectedInvite.name}?`}
              buttonText={`Sim, Enviar`}
              action={handleInviteReSend}
            />
          )}
          {deleteInviteConfirm && (
            <ConfirmationModal
              setConfirm={setDeleteInviteConfirm}
              type={WARNING_TYPES.ERROR}
              title={`Excluir convite para: ${selectedInvite.email}?`}
              content={`Você tem certeza que quer excluir o convite para ${selectedInvite.name}?`}
              buttonText={`Sim, Excluir`}
              action={handleDeleteInvite}
            />
          )}
          {!profile?.isProfessional && (
            <BasicPlanMsg
              message={`Somente 1 ${membersModule.singular} permitido no Plano Básico`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Members;
