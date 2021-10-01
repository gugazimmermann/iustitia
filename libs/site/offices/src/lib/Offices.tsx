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
import { OfficeServices } from "@iustitia/site/services";
import { ProfileInterface } from "@iustitia/site/dashboard";
import { Details, Form, List } from "./components";

export const OfficeModule = OfficeServices.OfficeModule;
export type OfficeInterface = OfficeServices.OfficeInterface;

export function convertProfileToSimpleProfile(profiles: ProfileInterface[]) {
  const simpleProfiles: PeopleServices.SimpleUserInterface[] = [];
  for (const profile of profiles)
    simpleProfiles.push(profile as unknown as PeopleServices.SimpleUserInterface);
  return simpleProfiles;
}

interface OfficesProps {
  profile?: ProfileInterface;
  setOffices?(countOffices: number): void;
}

export function Offices({ profile, setOffices }: OfficesProps) {
  const history = useHistory();
  const { pathname } = useLocation();
  let { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: "",
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const [whatToShow, setWhatToShow] = useState<
    "list" | "details" | "update" | "create"
  >();
  const [dataList, setDataList] = useState([] as OfficeInterface[]);
  const [showDataList, setShowDataList] = useState([] as OfficeInterface[]);
  const [selected, setSelected] = useState({} as OfficeInterface);
  const [confirm, setConfirm] = useState(false);
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  useEffect(() => {
    if (pathname.includes("add")) {
      setWhatToShow("create");
    } else if (pathname.includes("edit")) {
      getSelected(id);
      setWhatToShow("update");
    } else {
      if (id) {
        getSelected(id);
        setWhatToShow("details");
      } else {
        getDataList();
        setWhatToShow("list");
      }
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
      let data = (await OfficeServices.getAll()) as OfficeInterface[];
      if (setOffices) setOffices(data.length);
      if (!profile?.isAdmin) data = data.filter(d => d.active)
      setDataList(data);
      const sortedData = Sort(data.slice(0), sort);
      setShowDataList(sortedData);
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

  async function getSelected(id: string) {
    setLoading(true);
    try {
      const data = (await OfficeServices.getOne(id)) as OfficeInterface;
      setSelected(data);
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
      history.push(OfficeModule.route);
    }
  }

  async function handleCreate(data: OfficeInterface) {
    setLoading(true);
    try {
      const newOffice = (await OfficeServices.create(data)) as OfficeInterface;
      setShowAlert({
        show: true,
        message: `${OfficeModule.singular} cadastrado com sucesso!`,
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      await getDataList();
      id = newOffice.id as string;
      history.push(`${OfficeModule.route}/${newOffice.id}`);
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

  async function handleUpate(data: OfficeInterface) {
    setLoading(true);
    try {
      await OfficeServices.update(data);
      setShowAlert({
        show: true,
        message: `${OfficeModule.singular} alterado com sucesso!`,
        type: WARNING_TYPES.WARNING,
        time: 3000,
      });
      reloadList();
      history.push(OfficeModule.route);
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

  async function handleDelete() {
    if (selected.id) {
      setLoading(true);
      try {
        await OfficeServices.deleteOne(selected.id);
        setShowAlert({
          show: true,
          message: `${OfficeModule.singular} removido com sucesso!`,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
        reloadList();
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setLoading(false);
        setShowAlert({
          ...showAlert,
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
        });
      }
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

  const createSearch = () => {
    return <SearchField setSearchParam={setSearchParam} />;
  };

  function createButton() {
    return (
      <AddButton
        back={whatToShow !== "list"}
        route={OfficeModule.route}
        reload={reloadList}
        isProfessional={profile?.isProfessional && profile.isAdmin}
      />
    );
  }

  return (
    <div className="container mx-auto">
      <Header
        before={OfficeModule.parents}
        main={OfficeModule.plural}
        search={createSearch}
        button={createButton}
        back={whatToShow !== "list"}
      />
      <div className="flex items-center justify-center overflow-hidden p-2">
        <div className="w-full">
          {showAlert.show && (
            <Alert alert={showAlert} setAlert={setShowAlert} />
          )}
          {whatToShow === "list" && (
            <List dataList={showDataList} sort={sort} setSort={setSort} />
          )}
          {whatToShow === "details" && (
            <Details
              loading={loading}
              setLoading={setLoading}
              setShowAlert={setShowAlert}
              data={selected}
              setData={setSelected}
              route={OfficeModule.route}
              setConfirm={setConfirm}
            />
          )}
          {whatToShow === "create" && (
            <Form loading={loading} create={handleCreate} />
          )}
          {whatToShow === "update" && (
            <Form loading={loading} data={selected} update={handleUpate} />
          )}
          {confirm && (
            <ConfirmationModal
              setConfirm={setConfirm}
              type={WARNING_TYPES.ERROR}
              title={`Excluir ${OfficeModule.singular}: ${selected.name}?`}
              content={`Você tem certeza que quer excluir o ${OfficeModule.singular} ${selected.name}? Todos os dados desse ${OfficeModule.singular} serão perdidos. Essa ação não poderá ser desfeita.`}
              action={handleDelete}
            />
          )}
          {!profile?.isProfessional && (
            <BasicPlanMsg
              message={`Somente 1 ${OfficeModule.singular} permitido no Plano Básico`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Offices;