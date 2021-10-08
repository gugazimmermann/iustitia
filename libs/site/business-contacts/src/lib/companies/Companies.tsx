import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Alert,
  AlertInterface,
  ConfirmationModal,
  Header,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { List, Details, Form } from "./components";
import { GetModule, ModulesEnum, ModulesInterface, GetRoutes, BCRoutesInterface } from "@iustitia/modules";
import { SearchIcon } from "@iustitia/site/icons";
import { BusinessContactsServices } from "@iustitia/site/services";

const BCModule = GetModule(ModulesEnum.businessContacts) as ModulesInterface;
const BCRoutes = GetRoutes(ModulesEnum.businessContacts) as BCRoutesInterface;

type BCCompaniesType = BusinessContactsServices.BCCompaniesRes;

export function Companies() {
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
  const [dataList, setDataList] = useState(
    [] as BCCompaniesType[]
  );
  const [showDataList, setShowDataList] = useState(
    [] as BCCompaniesType[]
  );
  const [selected, setSelected] = useState(
    {} as BCCompaniesType
  );
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState("ASC");

  useEffect(() => {
    if (pathname.includes("adicionar")) {
      setBack(true);
      setShowList(false);
      setShowDetails(false);
      setShowUpdade(false);
      setShowCreate(true);
    } else if (pathname.includes("alterar")) {
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
  }, [id, pathname]);

  async function getSelected(id: string) {
    try {
      const data = await BusinessContactsServices.getOneCompany({id});
      setSelected(data);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      })
      history.push(BCRoutes.listCompanies);
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
  }, [sort]);

  function handleSort(data?: BCCompaniesType[]) {
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

  function handleSearch(data: BCCompaniesType[], param: string) {
    const res = data.filter((d) =>
      d.name?.toLocaleLowerCase().includes(param.toLocaleLowerCase())
    );
    setShowDataList(res);
  }

  const createButton = (state: boolean) => {
    return (
      <button
        onClick={() => {
          if (back) {
            if (location.pathname !== BCRoutes.listCompanies) {
              history.push(BCRoutes.listCompanies);
            } else {
              reloadList();
            }
          } else {
            history.push(`${BCRoutes.addCompany}`);
          }
        }}
        className={`px-4 py-2 text-sm text-white rounded-md ${
          !state
            ? `bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
            : `bg-secondary-500 hover:bg-secondary-700 `
        }`}
      >
        {back ? "Listagem" : `Adicionar ${BCModule.singular}`}
      </button>
    );
  };

  async function getDataList() {
    try {
      const data =
        (await BusinessContactsServices.getAllCompanies()) as BCCompaniesType[];
      setDataList(data);
      handleSort(data);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      })
      console.log(err);
    }
  }

  function handleEdit() {
    history.push(`${BCRoutes.updateCompany}/${selected?.id}`);
  }

  async function handleCreate(data: BCCompaniesType) {
    setLoading(true);
    try {
      await BusinessContactsServices.createCompany({formData: data});
      setShowAlert({
        show: true,
        message: `${BCModule.singular} cadastrada com sucesso.`,
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      })
      reloadList();
      history.push(BCRoutes.listCompanies);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      })
      console.log(err);
    }
  }

  async function handleUpate(data: BCCompaniesType) {
    setLoading(true);
    try {
      await BusinessContactsServices.updateCompany({formData: data});
      setShowAlert({
        show: true,
        message: `${BCModule.singular} alterada com sucesso.`,
        type: WARNING_TYPES.INFO,
        time: 3000,
      })
      reloadList();
      history.push(BCRoutes.listCompanies);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      })
      console.log(err);
    }
  }

  async function handleDelete() {
    if (selected.id) {
      setLoading(true);
      try {
        await BusinessContactsServices.deleteOneCompany({id: selected.id});
        setShowAlert({
          show: true,
          message: `${BCModule.singular} removida com sucesso.`,
          type: WARNING_TYPES.WARNING,
          time: 3000,
        })
        reloadList();
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setShowAlert({
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        })
        console.log(err);
      }
    }
  }

  return (
    <>
      <Header
        before={[""]}
        main={BCModule.plural}
        search={showList ? createSearch : undefined}
        button={createButton}
        back={back}
      />
      <div className="mb-10">
        <div className="flex items-center justify-center overflow-hidden p-2">
          <div className="w-full">
            <div className="bg-white shadow-sm rounded">
              {showAlert.show && <Alert alert={showAlert} setAlert={setShowAlert} />}
              {showList && (
                <List
                  dataList={showDataList}
                  sort={sort}
                  setSort={setSort}
                  setSelected={setSelected}
                  setConfirm={setConfirm}
                />
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
                  title={`Excluir ${BCModule.singular}: ${selected.name}?`}
                  content={`Você tem certeza que quer excluir a ${BCModule.singular} ${selected.name}? Todos os dados dessa ${BCModule.singular} serão perdidos. Essa ação não poderá ser desfeita.`}
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
