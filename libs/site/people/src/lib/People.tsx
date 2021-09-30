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
import { PeopleServices } from "@iustitia/site/services";
import { ProfileServices } from "@iustitia/site/services";
import { List, Form, ListInvites } from "./components";

export const PeopleModule = PeopleServices.PeopleModule;
export type PeopleInterface = PeopleServices.PeopleInterface;
export type SimpleUserInterface = PeopleServices.SimpleUserInterface;

interface PeopleProps {
  profile?: ProfileServices.ProfileInterface;
}

export function People({ profile }: PeopleProps) {
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
  const [dataList, setDataList] = useState([] as SimpleUserInterface[]);
  const [dataListInvite, setDataListInvite] = useState([] as PeopleInterface[]);
  const [showDataList, setShowDataList] = useState([] as SimpleUserInterface[]);
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  const [selectedInvite, setSelectedInvite] = useState({} as PeopleInterface);
  const [sendInviteConfirm, setSendInviteConfirm] = useState(false);
  const [deleteInviteConfirm, setDeleteInviteConfirm] = useState(false);

  useEffect(() => {
    if (pathname.includes("add")) {
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
      const data = (await PeopleServices.getAll()) as SimpleUserInterface[];
      setDataList(data);
      const sortedData = Sort(data.slice(0), sort);
      setShowDataList(sortedData);
      const datainvites =
        (await PeopleServices.getInvites()) as SimpleUserInterface[];
      setDataListInvite(datainvites);
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
      const newInvite = (await PeopleServices.createInvite(
        data
      )) as PeopleInterface;
      setShowAlert({
        show: true,
        message: `${PeopleModule.singular} cadastrada com sucesso!`,
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      await getDataList();
      history.push(PeopleModule.route);
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

  async function handleDeleteInvite() {
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

  const createSearch = () => {
    return <SearchField setSearchParam={setSearchParam} />;
  };

  function createButton() {
    return (
      <AddButton
        back={whatToShow !== "list"}
        route={PeopleModule.route}
        reload={reloadList}
        isProfessional={profile?.isProfessional}
      />
    );
  }

  return (
    <div className="container mx-auto">
      <Header
        before={PeopleModule.parents}
        main={PeopleModule.plural}
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
              message={`Somente 1 ${PeopleModule.singular} permitido no Plano Básico`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default People;
