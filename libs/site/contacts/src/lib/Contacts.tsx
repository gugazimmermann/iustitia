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
  company?: string;
  position?: string;
  email?: string;
  phone?: string;
  zip?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  description?: string;
  tenantId?: string;
}

interface useParamsProps {
  id: string;
}

export function Contacts() {
  const history = useHistory();
  const location = useLocation();
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

  useEffect(() => {
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
  }, [id]);

  async function getSelected(id: string) {
    try {
      const data = await Services.getOne(id);
      setSelected(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
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
            setShowList(false);
            setShowDetails(false);
            setShowUpdade(false);
            setShowCreate(true);
            setBack(true);
          }
        }}
        className={`px-4 py-2 text-sm text-white rounded-md ${
          !state
            ? `bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
            : `bg-secondary-500 hover:bg-secondary-700 `
        }`}
      >
        {back ? "Voltar" : `Adicionar ${ModuleName.singular}`}
      </button>
    );
  };

  async function getDataList() {
    try {
      const data = await Services.getAll();
      setDataList(data as ModuleInterface[]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      console.log(err);
    }
  }

  async function handleCreate(data: FormData) {
    setLoading(true);
    try {
      await Services.create(data);
      setShowSuccessAlert(true);
      setShowEditAlert(false);
      setShowDeleteAlert(false);
      reloadList();
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
                  setBack={setBack}
                  setSelected={setSelected}
                  setShowList={setShowList}
                  setShowDetails={setShowDetails}
                  setShowUpdade={setShowUpdade}
                  setConfirm={setConfirm}
                />
              )}
              {showDetails && <Details data={selected} />}
              {showCreate && <Form loading={loading} create={handleCreate} />}
              {showUpdate && (
                <Form loading={loading} data={selected} update={handleUpate} />
              )}
              {confirm && (
                <ConfirmationModal
                  setConfirm={setConfirm}
                  type={WARNING_TYPES.ERROR}
                  title={`Excluir ${ModuleName.singular}: ${selected.name}?`}
                  content={`Você tem certeza que quer excluir o ${ModuleName.singular} ${selected.name}? Todos os dados desse ${ModuleName.singular} serão perdidos. Essa ação não poderá ser ${ModuleName.singular}.`}
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
