import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Alert,
  AlertInterface,
  ConfirmationModal,
  Header,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { SearchIcon } from "@iustitia/site/icons";
import {
  BusinessContactsServices,
  PlacesServices,
} from "@iustitia/site/services";
import {
  GetModule,
  ModulesEnum,
  ModulesInterface,
  GetRoutes,
  BCRoutesInterface,
} from "@iustitia/modules";
import { Details, Form, List } from "./components";

const BCModule = GetModule(ModulesEnum.businessContacts) as ModulesInterface;
const BCRoutes = GetRoutes(ModulesEnum.businessContacts) as BCRoutesInterface;

type BCPersonsType = BusinessContactsServices.BCPersonsRes;
type BCCompaniesType = BusinessContactsServices.BCCompaniesRes;
type PlacesType = PlacesServices.PlacesRes;

export function Persons() {
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
  const [dataList, setDataList] = useState([] as BCPersonsType[]);
  const [showDataList, setShowDataList] = useState([] as BCPersonsType[]);
  const [selected, setSelected] = useState({} as BCPersonsType);
  const [places, setPlaces] = useState<PlacesType[]>();
  const [companies, setCompanies] = useState<BCCompaniesType[]>();
  const [selectedType, setSelectedType] = useState<string>("Personal");
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState("ASC");

  useEffect(() => {
    seePlaces();
    seeCompanies();
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
    getDataList(selectedType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  async function seePlaces() {
    try {
      const places = (await PlacesServices.getAll()) as PlacesType[];
      if (places.length) setPlaces(places);
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

  async function seeCompanies() {
    try {
      const companies = await BusinessContactsServices.getAllPersons();
      if ((companies as BCCompaniesType[]).length)
        setCompanies(companies as BCCompaniesType[]);
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

  async function getSelected(id: string) {
    try {
      const data = await BusinessContactsServices.getOnePerson({ id });
      setSelected(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      history.push(BCRoutes.listPersons);
    }
  }

  async function reloadList() {
    await getDataList(selectedType);
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

  function handleSort(data?: BCPersonsType[]) {
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

  function handleSearch(data: BCPersonsType[], param: string) {
    const res = data.filter((d) => d.name?.includes(param));
    setShowDataList(res);
  }

  const createSelect = () => {
    return (
      <select
        defaultValue={selectedType}
        className="rounded-md text-sm focus:ring-0 focus:ring-opacity-75 text-gray-900 focus:ring-primary-500 border-gray-300"
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value={"All"}>Geral</option>
        <option value={"Personal"}>Pessoal</option>
        {places &&
          places.map((o, i) => (
            <option key={i} value={o.id}>
              {o.name}
            </option>
          ))}
      </select>
    );
  };

  const createButton = (state: boolean) => {
    return (
      <button
        onClick={() => {
          if (back) {
            if (location.pathname !== BCRoutes.listPersons) {
              history.push(BCRoutes.listPersons);
            } else {
              reloadList();
            }
          } else {
            history.push(`${BCRoutes.addPerson}`);
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

  async function getDataList(selectedType: string) {
    try {
      const allData =
        (await BusinessContactsServices.getAllPersons()) as BCPersonsType[];
      let data: BCPersonsType[] = [];
      if (selectedType === "All") data = allData;
      if (selectedType === "Personal") data = allData.filter((d) => d.userId);
      if (selectedType !== "All" && selectedType !== "Personal")
        data = allData.filter((d) => d.placeId === selectedType);
      setDataList(data);
      handleSort(data);
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
    history.push(`${BCRoutes.updatePerson}/${selected?.id}`);
  }

  async function handleCreate(data: FormData) {
    setLoading(true);
    try {
      await BusinessContactsServices.createPerson({ formData: data });
      reloadList();
      history.push(BCRoutes.listPersons);
      setShowAlert({
        show: true,
        message: `${BCModule.singular} cadastrado com sucesso.`,
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

  async function handleUpate(data: FormData) {
    setLoading(true);
    try {
      await BusinessContactsServices.updatePerson({ formData: data });
      reloadList();
      history.push(BCRoutes.listPersons);
      setShowAlert({
        show: true,
        message: `${BCModule.singular} alterado com sucesso.`,
        type: WARNING_TYPES.INFO,
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

  async function handleDelete() {
    if (selected.id) {
      setLoading(true);
      try {
        await BusinessContactsServices.deleteOnePerson({id: selected.id});
        reloadList();
        setShowAlert({
          show: true,
          message: `${BCModule.singular} removido com sucesso.`,
          type: WARNING_TYPES.WARNING,
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
  }

  return (
    <>
      <Header
        before={[""]}
        main={BCModule.singular}
        select={showList ? createSelect : undefined}
        search={createSearch}
        button={createButton}
        back={back}
      />
      <div className="mb-10">
        <div className="flex items-center justify-center overflow-hidden p-2">
          <div className="w-full">
            <div className="bg-white shadow-sm rounded">
              {showAlert.show && (
                <Alert alert={showAlert} setAlert={setShowAlert} />
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
                <Details data={selected} places={places} edit={handleEdit} />
              )}
              {showCreate && (
                <Form
                  loading={loading}
                  places={places}
                  companies={companies}
                  create={handleCreate}
                />
              )}
              {showUpdate && (
                <Form
                  loading={loading}
                  data={selected}
                  places={places}
                  companies={companies}
                  update={handleUpate}
                />
              )}
              {confirm && (
                <ConfirmationModal
                  setConfirm={setConfirm}
                  type={WARNING_TYPES.ERROR}
                  title={`Excluir ${BCModule.singular}: ${selected.name}?`}
                  content={`Você tem certeza que quer excluir o ${BCModule.singular} ${selected.name}? Todos os dados desse ${BCModule.singular} serão perdidos. Essa ação não poderá ser desfeita.`}
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

export default Persons;
