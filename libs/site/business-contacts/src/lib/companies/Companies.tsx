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
import {
  GetModule,
  ModulesEnum,
  ModulesInterface,
  GetRoutes,
  BCRoutesInterface,
} from "@iustitia/modules";
import {
  BusinessContactsServices,
  ProfilesServices,
} from "@iustitia/site/services";
import { List, Details, Form } from "./components";

const BCModule = GetModule(ModulesEnum.businessContacts) as ModulesInterface;
const BCRoutes = GetRoutes(ModulesEnum.businessContacts) as BCRoutesInterface;

type BCCompaniesType = BusinessContactsServices.BCCompaniesRes;
type ProfilesType = ProfilesServices.ProfilesRes;

interface CompaniesProps {
  profile?: ProfilesType;
}

export function Companies({ profile }: CompaniesProps) {
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

  const [confirm, setConfirm] = useState(false);
  const [dataList, setDataList] = useState([] as BCCompaniesType[]);
  const [showDataList, setShowDataList] = useState([] as BCCompaniesType[]);
  const [selected, setSelected] = useState({} as BCCompaniesType);
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  useEffect(() => {
    if (pathname.includes("adicionar")) {
      setWhatToShow("create");
    } else if (pathname.includes("alterar")) {
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
  }, [id, pathname]);

  async function reloadList() {
    await getDataList();
    setWhatToShow("list");
  }

  async function getDataList() {
    setLoading(true);
    try {
      const data =
        (await BusinessContactsServices.getAllCompanies()) as BCCompaniesType[];
      setDataList(data);
      const sortedData = Sort(data.slice(0), sort);
      setShowDataList(sortedData);
      setLoading(false);
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
      const data = await BusinessContactsServices.getOneCompany({ id });
      setSelected(data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      history.push(BCRoutes.listCompanies);
    }
  }

  async function handleCreate(data: BCCompaniesType) {
    setLoading(true);
    try {
      const newCompany = (await BusinessContactsServices.createCompany({
        formData: data,
      })) as BCCompaniesType;
      setShowAlert({
        show: true,
        message: `${BCModule.singular} cadastrada com sucesso.`,
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      await getDataList();
      setShowAlert({
        show: true,
        message: `${BCModule.singular} cadastrado com sucesso.`,
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      id = newCompany.id as string;
      history.push(`${BCRoutes.detailsCompany}/${newCompany.id}`);
      setLoading(false);
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

  async function handleUpate(data: BCCompaniesType) {
    setLoading(true);
    try {
      await BusinessContactsServices.updateCompany({ formData: data });
      setShowAlert({
        show: true,
        message: `${BCModule.singular} alterada com sucesso.`,
        type: WARNING_TYPES.INFO,
        time: 3000,
      });
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
      });
    }
  }

  async function handleDelete() {
    if (selected.id) {
      setLoading(true);
      try {
        await BusinessContactsServices.deleteOneCompany({ id: selected.id });
        setShowAlert({
          show: true,
          message: `${BCModule.singular} removida com sucesso.`,
          type: WARNING_TYPES.WARNING,
          time: 3000,
        });
        reloadList();
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setShowAlert({
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
        console.log(err);
      }
    }
  }

  useEffect(() => {
    const sortedData = Sort(dataList.slice(0), sort);
    setShowDataList(sortedData);
  }, [sort]);

  useEffect(() => {
    const data = dataList.length ? dataList.slice(0) : [];
    if (searchParam) {
      const res = data.filter((d) =>
        (d.name as string)
          .toLocaleLowerCase()
          .includes(searchParam.toLocaleLowerCase())
      );
      setShowDataList(res);
    } else {
      setShowDataList(data);
    }
  }, [searchParam]);

  const createSearch = () => {
    return <SearchField setSearchParam={setSearchParam} />;
  };

  function createButton() {
    return (
      <AddButton
        back={whatToShow !== "list"}
        backRoute={BCRoutes.listCompanies}
        addRoute={BCRoutes.addCompany}
        reload={reloadList}
        isProfessional={profile?.isProfessional && profile.isAdmin}
      />
    );
  }

  return (
    <div className="container mx-auto">
      <Header
        before={[BCModule.plural]}
        main={`Empresas`}
        search={whatToShow === "list" ? createSearch : undefined}
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
              data={selected}
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
              title={`Excluir ${BCModule.singular}: ${selected.name}?`}
              content={`Você tem certeza que quer excluir a ${BCModule.singular} ${selected.name}? Todos os dados dessa ${BCModule.singular} serão perdidos. Essa ação não poderá ser desfeita.`}
              action={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Companies;
