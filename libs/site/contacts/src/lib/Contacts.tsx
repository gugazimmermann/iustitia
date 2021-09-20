import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Alert,
  ConfirmationModal,
  Header,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import * as Services from "./services";
import Form from "./form/Form";
import List from "./list/List";
import Details from "./details/Details";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { getOffices, IOffice } from "@iustitia/site/dashboard";

export const ModuleName = {
  module: "contacts",
  parents: ["Agenda"],
  singular: "Contato",
  plural: "Contatos",
  route: Routes.Contacts,
};

export interface ModuleInterface {
  id?: string;
  avatar?: string;
  name?: string;
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
  userId?: string;
  officeId?: string;
  type?: string;
}

export interface AttachmentInterface {
  id: string;
  date: string;
  name: string;
  link: string;
}

export interface NoteInterface {
  id?: string;
  date: string;
  title: string;
  content: string;
  tenantId?: string;
  ownerId: string;
}

interface useParamsProps {
  id: string;
}

export function Contacts() {
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
  const [selected, setSelected] = useState({} as ModuleInterface);
  const [offices, setOffices] = useState<IOffice[]>();
  const [selectedType, setSelectedType] = useState<string>("Personal");

  useEffect(() => {
    if (showSuccessAlert) setTimeout(() => setShowSuccessAlert(false), 3000);
    if (showEditAlert) setTimeout(() => setShowEditAlert(false), 3000);
    if (showDeleteAlert) setTimeout(() => setShowDeleteAlert(false), 3000);
    if (error) setTimeout(() => setError(""), 3000);
  }, [showSuccessAlert, showEditAlert, showDeleteAlert, error]);

  useEffect(() => {
    seeOffices();
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
  }, [selectedType]);

  async function seeOffices() {
    try {
      const offices: IOffice[] = await getOffices();
      if (offices.length) setOffices(offices);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      history.push(ModuleName.route);
      console.log(err);
    }
  }

  async function getSelected(id: string) {
    try {
      const data = await Services.getOne(id);
      setSelected(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      history.push(ModuleName.route);
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

  async function getDataList(selectedType: string) {
    try {
      const allData = (await Services.getAll()) as ModuleInterface[];
      let data: ModuleInterface[] = [];
      if (selectedType === "All") data = allData;
      if (selectedType === "Personal") data = allData.filter((d) => d.userId);
      if (selectedType !== "All" && selectedType !== "Personal") data = allData.filter((d) => d.officeId === selectedType);
      setDataList(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      console.log(err);
    }
  }

  function handleEdit() {
    history.push(`${ModuleName.route}/edit/${selected?.id}`);
  }

  async function handleCreate(data: FormData) {
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

  async function handleUpate(data: FormData) {
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
        select={showList ? createSelect : undefined}
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
                  message={`${ModuleName.singular} cadastrado com Sucesso!`}
                  closeFunction={setShowSuccessAlert}
                />
              )}
              {showEditAlert && (
                <Alert
                  type={WARNING_TYPES.INFO}
                  message={`${ModuleName.singular} alterado com Sucesso!`}
                  closeFunction={setShowEditAlert}
                />
              )}
              {showDeleteAlert && (
                <Alert
                  type={WARNING_TYPES.WARNING}
                  message={`${ModuleName.singular} removido com Sucesso!`}
                  closeFunction={setShowDeleteAlert}
                />
              )}
              {showList && (
                <List
                  dataList={dataList}
                  setSelected={setSelected}
                  setConfirm={setConfirm}
                />
              )}
              {showDetails && <Details data={selected} offices={offices} edit={handleEdit} />}
              {showCreate && <Form loading={loading} offices={offices} create={handleCreate} />}
              {showUpdate && (
                <Form
                  loading={loading}
                  data={selected}
                  offices={offices}
                  update={handleUpate}
                />
              )}
              {confirm && (
                <ConfirmationModal
                  setConfirm={setConfirm}
                  type={WARNING_TYPES.ERROR}
                  title={`Excluir ${ModuleName.singular}: ${selected.name}?`}
                  content={`Você tem certeza que quer excluir o ${ModuleName.singular} ${selected.name}? Todos os dados desse ${ModuleName.singular} serão perdidos. Essa ação não poderá ser desfeita.`}
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
