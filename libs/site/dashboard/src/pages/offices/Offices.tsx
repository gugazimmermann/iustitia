import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Alert,
  ConfirmationModal,
  Header,
  SearchIcon,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { OfficeServices } from "@iustitia/site/services";
import { Details, Form, List } from "./components";
import { ProfileInterface } from "../profile/Profile";

export const { route, singular, parents, plural } = OfficeServices.OfficeModule;
export type OfficeInterface = OfficeServices.OfficeInterface;

interface OfficesProps {
  profile?: ProfileInterface;
  offices?: OfficeInterface[];
  setOffices?(offices: OfficeInterface[]): void;
}

export function Offices({ profile, offices, setOffices }: OfficesProps) {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = useLocation();
  let { id } = useParams<{ id: string }>();
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
  const [dataList, setDataList] = useState([] as OfficeInterface[]);
  const [showDataList, setShowDataList] = useState([] as OfficeInterface[]);
  const [selected, setSelected] = useState({} as OfficeInterface);
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
      const data = (await OfficeServices.getOne(id)) as OfficeInterface;
      setSelected(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      history.push(route);
      console.log(err);
    }
  }

  async function reloadList() {
    await handleSetSelect();
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

  function handleSort(data?: OfficeInterface[]) {
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

  function handleSearch(data: OfficeInterface[], param: string) {
    const res = data.filter((d) => d.name?.includes(param));
    setShowDataList(res);
  }

  const createButton = (state: boolean) => {
    return (
      <button
        onClick={() => {
          if (back) {
            if (location.pathname !== route) {
              history.push(route);
            } else {
              reloadList();
            }
          } else if (!profile?.subscription?.basic) {
            history.push(`${route}/add`);
          }
        }}
        className={`px-4 py-2 text-sm text-white rounded-md ${
          state
            ? `bg-secondary-500 hover:bg-secondary-700 `
            : profile?.subscription?.basic
            ? `bg-gray-300 `
            : `bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
        }`}
        disabled={profile?.subscription?.basic}
      >
        {back ? "Listagem" : `Adicionar ${singular}`}
      </button>
    );
  };

  async function handleSetSelect() {
    if (setOffices) {
      try {
        const data = await OfficeServices.getAll();
        setOffices(data as OfficeInterface[]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message as string);
        console.log(err);
      }
    }
  }

  async function getDataList() {
    try {
      const data = offices as OfficeInterface[];
      setDataList(data);
      handleSort(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      console.log(err);
    }
  }

  function handleEdit() {
    history.push(`${route}/edit/${selected?.id}`);
  }

  async function handleCreate(data: OfficeInterface) {
    setLoading(true);
    try {
      const newOffice = (await OfficeServices.create(data)) as OfficeInterface;
      setShowSuccessAlert(true);
      setShowEditAlert(false);
      setShowDeleteAlert(false);
      await handleSetSelect();
      id = newOffice.id as string;
      history.push(`${route}/${newOffice.id}`);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setError(err.message as string);
      console.log(err);
    }
  }

  async function handleUpate(data: OfficeInterface) {
    setLoading(true);
    try {
      await OfficeServices.update(data);
      setShowSuccessAlert(false);
      setShowEditAlert(true);
      setShowDeleteAlert(false);
      reloadList();
      history.push(route);
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
        await OfficeServices.deleteOne(selected.id);
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
        before={parents}
        main={plural}
        search={createSearch}
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
                  message={`${singular} cadastrado com Sucesso!`}
                  closeFunction={setShowSuccessAlert}
                />
              )}
              {showEditAlert && (
                <Alert
                  type={WARNING_TYPES.INFO}
                  message={`${singular} alterado com Sucesso!`}
                  closeFunction={setShowEditAlert}
                />
              )}
              {showDeleteAlert && (
                <Alert
                  type={WARNING_TYPES.WARNING}
                  message={`${singular} removido com Sucesso!`}
                  closeFunction={setShowDeleteAlert}
                />
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
                  {profile?.subscription?.basic && <div className="text-xs text-gray-400 text-right p-2">Somnete 1 {singular} permitido no Plano Básico</div>}
                </>
              )}
              {showDetails && <Details data={selected} edit={handleEdit} />}
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
      </div>
    </>
  );
}

export default Offices;
