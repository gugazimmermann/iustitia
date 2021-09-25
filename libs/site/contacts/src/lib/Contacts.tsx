import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Alert,
  ConfirmationModal,
  Header,
  SearchIcon,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import {
  ContactServices,
  OfficeServices,
  CompanyService,
  NoteServices,
  AttchmentServices
} from "@iustitia/site/services";
import { Details, Form, List } from "./components";

export const { route, singular, parents, plural } = ContactServices.ContactModule;
export type ContactInterface = ContactServices.ContactInterface;
export type OfficeInterface = OfficeServices.OfficeInterface;
export type CompanyInterface = CompanyService.CompanyInterface;
export type NoteInterface = NoteServices.NoteInterface;
export type AttachmentInterface = AttchmentServices.AttachmentInterface;

export function Contacts() {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
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
  const [dataList, setDataList] = useState([] as ContactInterface[]);
  const [showDataList, setShowDataList] = useState([] as ContactInterface[]);
  const [selected, setSelected] = useState({} as ContactInterface);
  const [offices, setOffices] = useState<OfficeInterface[]>();
  const [companies, setCompanies] = useState<CompanyInterface[]>();
  const [selectedType, setSelectedType] = useState<string>("Personal");
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState("ASC");

  useEffect(() => {
    if (showSuccessAlert) setTimeout(() => setShowSuccessAlert(false), 3000);
    if (showEditAlert) setTimeout(() => setShowEditAlert(false), 3000);
    if (showDeleteAlert) setTimeout(() => setShowDeleteAlert(false), 3000);
    if (error) setTimeout(() => setError(""), 3000);
  }, [showSuccessAlert, showEditAlert, showDeleteAlert, error]);

  useEffect(() => {
    seeOffices();
    seeCompanies();
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
    getDataList(selectedType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  async function seeOffices() {
    try {
      const offices = (await OfficeServices.getAll()) as OfficeInterface[];
      if (offices.length) setOffices(offices);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      console.log(err);
    }
  }

  async function seeCompanies() {
    try {
      const companies = await CompanyService.getAll();
      if ((companies as CompanyInterface[]).length)
        setCompanies(companies as CompanyInterface[]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      console.log(err);
    }
  }

  async function getSelected(id: string) {
    try {
      const data = await ContactServices.getOne(id);
      setSelected(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      history.push(route);
      console.log(err);
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

  function handleSort(data?: ContactInterface[]) {
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

  function handleSearch(data: ContactInterface[], param: string) {
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
        {offices &&
          offices.map((o, i) => (
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
            if (location.pathname !== route) {
              history.push(route);
            } else {
              reloadList();
            }
          } else {
            history.push(`${route}/add`);
          }
        }}
        className={`px-4 py-2 text-sm text-white rounded-md ${
          !state
            ? `bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
            : `bg-secondary-500 hover:bg-secondary-700 `
        }`}
      >
        {back ? "Listagem" : `Adicionar ${singular}`}
      </button>
    );
  };

  async function getDataList(selectedType: string) {
    try {
      const allData = (await ContactServices.getAll()) as ContactInterface[];
      let data: ContactInterface[] = [];
      if (selectedType === "All") data = allData;
      if (selectedType === "Personal") data = allData.filter((d) => d.userId);
      if (selectedType !== "All" && selectedType !== "Personal")
        data = allData.filter((d) => d.officeId === selectedType);
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

  async function handleCreate(data: FormData) {
    setLoading(true);
    try {
      await ContactServices.create(data);
      setShowSuccessAlert(true);
      setShowEditAlert(false);
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

  async function handleUpate(data: FormData) {
    setLoading(true);
    try {
      await ContactServices.update(data);
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
        await ContactServices.deleteOne(selected.id);
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
        select={showList ? createSelect : undefined}
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
                <List
                  dataList={showDataList}
                  sort={sort}
                  setSort={setSort}
                  setSelected={setSelected}
                  setConfirm={setConfirm}
                />
              )}
              {showDetails && (
                <Details data={selected} offices={offices} edit={handleEdit} />
              )}
              {showCreate && (
                <Form
                  loading={loading}
                  offices={offices}
                  companies={companies}
                  create={handleCreate}
                />
              )}
              {showUpdate && (
                <Form
                  loading={loading}
                  data={selected}
                  offices={offices}
                  companies={companies}
                  update={handleUpate}
                />
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

export default Contacts;
