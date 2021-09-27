import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  AddButton,
  Alert,
  AlertInterface,
  ConfirmationModal,
  Header,
  SearchField,
} from "@iustitia/site/shared-components";
import { Sort, WARNING_TYPES } from "@iustitia/site/shared-utils";
import { OfficeServices } from "@iustitia/site/services";
import { Details, Form, List } from "./components";
import { ProfileInterface } from "../profile/Profile";

export const { route, singular, parents, plural } = OfficeServices.OfficeModule;
export type OfficeInterface = OfficeServices.OfficeInterface;

interface OfficesProps {
  profile?: ProfileInterface;
  setOffices?(offices: OfficeInterface[]): void;
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

  const [showList, setShowList] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdade] = useState(false);
  const [back, setBack] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [dataList, setDataList] = useState([] as OfficeInterface[]);
  const [showDataList, setShowDataList] = useState([] as OfficeInterface[]);
  const [selected, setSelected] = useState({} as OfficeInterface);
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  function handleShow(component: "list" | "details" | "update" | "create") {
    if (component === "list") {
      setShowList(true);
      setShowDetails(false);
      setShowUpdade(false);
      setShowCreate(false);
    } else if (component === "details") {
      setShowList(false);
      setShowDetails(true);
      setShowUpdade(false);
      setShowCreate(false);
    } else if (component === "update") {
      setShowList(false);
      setShowDetails(false);
      setShowUpdade(true);
      setShowCreate(false);
    } else if (component === "create") {
      setShowList(false);
      setShowDetails(false);
      setShowUpdade(false);
      setShowCreate(true);
    }
  }

  useEffect(() => {
    if (pathname.includes("add")) {
      setBack(true);
      handleShow("create");
    } else if (pathname.includes("edit")) {
      getSelected(id);
      setBack(true);
      handleShow("update");
    } else {
      if (id) {
        getSelected(id);
        setBack(true);
        handleShow("details");
      } else {
        getDataList();
        setBack(false);
        handleShow("list");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pathname]);

  async function getDataList() {
    try {
      const data = (await OfficeServices.getAll()) as OfficeInterface[];
      if (setOffices) setOffices(data);
      setDataList(data);
      const sortedData = Sort(data.slice(0), sort);
      setShowDataList(sortedData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setShowAlert({
        ...showAlert,
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
      });
    }
  }

  async function getSelected(id: string) {
    try {
      const data = (await OfficeServices.getOne(id)) as OfficeInterface;
      setSelected(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setShowAlert({
        ...showAlert,
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
      });
      history.push(route);
      console.log(err);
    }
  }

  async function reloadList() {
    await getDataList();
    handleShow("list");
    setBack(false);
  }

  useEffect(() => {
    const sortedData = Sort(dataList.slice(0), sort);
    setShowDataList(sortedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  async function handleCreate(data: OfficeInterface) {
    setLoading(true);
    try {
      const newOffice = (await OfficeServices.create(data)) as OfficeInterface;
      setShowAlert({
        ...showAlert,
        show: true,
        message: `${singular} cadastrado com sucesso!`,
        type: WARNING_TYPES.SUCCESS,
      });
      await getDataList();
      id = newOffice.id as string;
      history.push(`${route}/${newOffice.id}`);
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

  async function handleUpate(data: OfficeInterface) {
    setLoading(true);
    try {
      await OfficeServices.update(data);
      setShowAlert({
        ...showAlert,
        show: true,
        message: `${singular} alterado com sucesso!`,
        type: WARNING_TYPES.WARNING,
      });
      reloadList();
      history.push(route);
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

  async function handleDelete() {
    if (selected.id) {
      setLoading(true);
      try {
        await OfficeServices.deleteOne(selected.id);
        setShowAlert({
          ...showAlert,
          show: true,
          message: `${singular} removido com sucesso!`,
          type: WARNING_TYPES.ERROR,
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
    const data = dataList.length ? dataList.slice(0) : [];
    if (searchParam) {
      handleSearch(data, searchParam);
    } else {
      setShowDataList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  function handleSearch(data: OfficeInterface[], param: string) {
    const res = data.filter((d) =>
      d.name.toLocaleLowerCase().includes(param.toLocaleLowerCase())
    );
    setShowDataList(res);
  }

  const createSearch = () => {
    return <SearchField setSearchParam={setSearchParam} />;
  };

  function createButton() {
    return (
      <AddButton
        back={back}
        route={route}
        reload={reloadList}
        isProfessional={profile?.isProfessional}
      />
    );
  }

  return (
    <>
      <Header
        before={parents}
        main={plural}
        search={createSearch}
        button={createButton}
        back={back}
      />
      <div className="flex items-center justify-center overflow-hidden p-2">
        <div className="w-full">
          <div className="bg-white shadow-sm rounded">
            {showAlert.show && (
              <Alert alert={showAlert} setAlert={setShowAlert} />
            )}
            {showList && (
              <>
                <List
                  dataList={showDataList}
                  sort={sort}
                  setSort={setSort}
                  setSelected={setSelected}
                  setConfirm={setConfirm}
                />
                {!profile?.isProfessional && (
                  <div className="text-xs text-gray-400 text-right p-2">
                    Somnete 1 {singular} permitido no Plano Básico
                  </div>
                )}
              </>
            )}
            {showDetails && <Details data={selected} route={route} />}
            {showCreate && <Form loading={loading} create={handleCreate} />}
            {showUpdate && (
              <Form loading={loading} data={selected} update={handleUpate} />
            )}
            {confirm && (
              <ConfirmationModal
                setConfirm={setConfirm}
                type={WARNING_TYPES.ERROR}
                title={`Excluir ${singular}: ${selected.name}?`}
                content={`Você tem certeza que quer excluir o ${singular} ${selected.name}? Todos os dados desse ${singular} serão perdidos. Essa ação não poderá ser desfeita.`}
                action={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Offices;
