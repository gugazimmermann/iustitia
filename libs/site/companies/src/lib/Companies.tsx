import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Alert,
  ConfirmationModal,
  Header,
  SearchIcon,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import * as Services from "./services";
import Form from "./form/Form";
import List from "./list/List";
import Details from "./details/Details";

export const ModuleName = {
  module: "companies",
  parents: ["Agenda"],
  singular: "Empresa",
  plural: "Empresas",
  route: Routes.Companies,
};

export interface ModuleInterface {
  id?: string;
  name?: string;
  site?: string;
  email?: string;
  phone?: string;
  zip?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  comments?: string;
  tenantId?: string;
  contacts?: {
    id: string;
    name: string;
    position: string;
  }[]
}

interface useParamsProps {
  id: string;
}

export function Companies() {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = useLocation();
  const { id } = useParams<useParamsProps>();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdade] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [back, setBack] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [dataList, setDataList] = useState([] as ModuleInterface[]);
  const [showDataList, setShowDataList] = useState([] as ModuleInterface[]);
  const [selected, setSelected] = useState({} as ModuleInterface);
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState("ASC");

  useEffect(() => {
    if (showSuccessAlert) setTimeout(() => setShowSuccessAlert(false), 3000);
    if (showEditAlert) setTimeout(() => setShowEditAlert(false), 3000);
    if (showDeleteAlert) setTimeout(() => setShowDeleteAlert(false), 3000);
    if (error) setTimeout(() => setError(""), 3000);
  }, [showSuccessAlert, showEditAlert, showDeleteAlert, error]);

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
        getDataList();
        setBack(false);
        setShowList(true);
        setShowDetails(false);
        setShowUpdade(false);
        setShowCreate(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pathname]);

  async function getSelected(id: string) {
    try {
      const data = await Services.getOne(id);
      setSelected(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      history.push(ModuleName.route);
      console.log(err);
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

  function handleSort(data?: ModuleInterface[]) {
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
    const data = dataList.slice(0);
    if (searchParam) {
      handleSearch(data, searchParam);
    } else {
      setShowDataList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  function handleSearch(data: ModuleInterface[], param: string) {
    const res = data.filter((d) => d.name?.toLocaleLowerCase().includes(param.toLocaleLowerCase()));
    setShowDataList(res);
  }

  const createButton = (state: boolean) => {
    return (
      <button
        onClick={() => {
          if (back) {
            if (location.pathname !== ModuleName.route) {
              history.push(ModuleName.route);
            } else {
              reloadList();
            }
          } else {
            history.push(`${ModuleName.route}/add`);
          }
        }}
        className={`px-4 py-2 text-sm text-white rounded-md ${
          !state
            ? `bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
            : `bg-secondary-500 hover:bg-secondary-700 `
        }`}
      >
        {back ? "Listagem" : `Adicionar ${ModuleName.singular}`}
      </button>
    );
  };

  async function getDataList() {
    try {
      const data = (await Services.getAll()) as ModuleInterface[];
      setDataList(data);
      handleSort(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      console.log(err);
    }
  }

  function handleEdit() {
    history.push(`${ModuleName.route}/edit/${selected?.id}`);
  }

  async function handleCreate(data: ModuleInterface) {
    setLoading(true);
    try {
      await Services.create(data);
      setShowSuccessAlert(true);
      setShowEditAlert(false);
      setShowDeleteAlert(false);
      reloadList();
      history.push(ModuleName.route);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setError(err.message as string);
      console.log(err);
    }
  }

  async function handleUpate(data: ModuleInterface) {
    setLoading(true);
    try {
      await Services.update(data);
      setShowSuccessAlert(false);
      setShowEditAlert(true);
      setShowDeleteAlert(false);
      reloadList();
      history.push(ModuleName.route);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setError(err.message as string);
      console.log(err);
    }
  }

  async function handleDelete() {
    if (selected.id) {
      setLoading(true);
      try {
        await Services.deleteOne(selected.id);
        setShowSuccessAlert(false);
        setShowEditAlert(false);
        setShowDeleteAlert(true);
        reloadList();
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setLoading(false);
        setError(err.message as string);
        console.log(err);
      }
    }
  }

  return (
    <>
      <Header
        before={ModuleName.parents}
        main={ModuleName.plural}
        search={showList ? createSearch : undefined}
        button={createButton}
        back={back}
      />
      <div className="mb-10">
        <div className="flex items-center justify-center overflow-hidden p-2">
          <div className="w-full">
            <div className="bg-white shadow-sm rounded">
              {error && <Alert type={WARNING_TYPES.ERROR} message={error} />}
              {showSuccessAlert && (
                <Alert
                  type={WARNING_TYPES.SUCCESS}
                  message={`${ModuleName.singular} cadastrada com Sucesso!`}
                  closeFunction={setShowSuccessAlert}
                />
              )}
              {showEditAlert && (
                <Alert
                  type={WARNING_TYPES.INFO}
                  message={`${ModuleName.singular} alterada com Sucesso!`}
                  closeFunction={setShowEditAlert}
                />
              )}
              {showDeleteAlert && (
                <Alert
                  type={WARNING_TYPES.WARNING}
                  message={`${ModuleName.singular} removida com Sucesso!`}
                  closeFunction={setShowDeleteAlert}
                />
              )}
              {showList && (
                <List
                  dataList={showDataList}
                  sort={sort}
                  setSort={setSort}
                  setSelected={setSelected}
                  setConfirm={setConfirm}
                />
              )}
              {showDetails && (
                <Details data={selected} edit={handleEdit} />
              )}
              {showCreate && (
                <Form
                  loading={loading}
                  create={handleCreate}
                />
              )}
              {showUpdate && (
                <Form
                  loading={loading}
                  data={selected}
                  update={handleUpate}
                />
              )}
              {confirm && (
                <ConfirmationModal
                  setConfirm={setConfirm}
                  type={WARNING_TYPES.ERROR}
                  title={`Excluir ${ModuleName.singular}: ${selected.name}?`}
                  content={`Você tem certeza que quer excluir a ${ModuleName.singular} ${selected.name}? Todos os dados dessa ${ModuleName.singular} serão perdidos. Essa ação não poderá ser desfeita.`}
                  action={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Companies;
