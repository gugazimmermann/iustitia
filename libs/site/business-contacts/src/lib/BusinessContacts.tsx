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
  BusinessContactsServices,
  PlacesServices,
  ProfilesServices,
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
type ProfilesType = ProfilesServices.ProfilesRes;

interface BusinessContactsProps {
  profile?: ProfilesType;
}

interface routeTypeInterface {
  list: string;
  details: string;
  add: string;
  update: string;
}

export function BusinessContacts({ profile }: BusinessContactsProps) {
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
  const [dataList, setDataList] = useState([] as BCPersonsType[]);
  const [showDataList, setShowDataList] = useState([] as BCPersonsType[]);
  const [selected, setSelected] = useState({} as BCPersonsType);
  const [places, setPlaces] = useState<PlacesType[]>();
  const [companies, setCompanies] = useState<BCCompaniesType[]>();
  const [selectedOwner, setSelectedOwner] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<
    "Clientes" | "Contatos" | "Fornecedores"
  >();
  const [routeType, setRouteType] = useState({} as routeTypeInterface);
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  useEffect(() => {
    getPlaces();
    getCompanies();
    setSelectedType(seeType());
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
        getDataList(selectedOwner);
        setWhatToShow("list");
      }
    }
  }, [id, pathname]);

  function seeType() {
    const pathType = pathname.split("/");
    if (pathType.includes("clientes")) return "Clientes";
    else if (pathType.includes("contatos")) return "Contatos";
    return "Fornecedores";
  }

  useEffect(() => {
    switch (selectedType) {
      case "Clientes": {
        setRouteType({
          list: BCRoutes.listPersons,
          details: BCRoutes.detailsPerson,
          add: BCRoutes.addPerson,
          update: BCRoutes.updatePerson,
        });
        break;
      }
      case "Contatos": {
        setRouteType({
          list: BCRoutes.listContacts,
          details: BCRoutes.detailsContact,
          add: BCRoutes.addContact,
          update: BCRoutes.updateContact,
        });
        break;
      }
      case "Fornecedores": {
        setRouteType({
          list: BCRoutes.listSuppliers,
          details: BCRoutes.detailsSupplier,
          add: BCRoutes.addSupplier,
          update: BCRoutes.updateSupplier,
        });
        break;
      }
      default: {
        setRouteType({
          list: BCRoutes.listPersons,
          details: BCRoutes.detailsPerson,
          add: BCRoutes.addPerson,
          update: BCRoutes.updatePerson,
        });
        break;
      }
    }
  }, [selectedType]);

  async function getPlaces() {
    try {
      const placesData = (await PlacesServices.getAll()) as PlacesType[];
      const places = placesData.filter((p) => p.active);
      if (places.length) setPlaces(places);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  }

  async function getCompanies() {
    try {
      const companies = await BusinessContactsServices.getAllCompanies();
      if ((companies as BCCompaniesType[]).length)
        setCompanies(companies as BCCompaniesType[]);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  }

  async function reloadList() {
    await getDataList(selectedOwner);
    setWhatToShow("list");
  }

  async function getDataList(selectedType: string) {
    setLoading(true);
    try {
      const type = seeType();
      const allData = (await BusinessContactsServices.getAllPersons({
        type,
      })) as BCPersonsType[];
      let data: BCPersonsType[] = [];
      if (selectedType === "All") data = allData;
      if (selectedType === "Personal") data = allData.filter((d) => d.userId);
      if (selectedType !== "All" && selectedType !== "Personal")
        data = allData.filter((d) => d.placeId === selectedType);
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
      const data = await BusinessContactsServices.getOnePerson({ id });
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
      history.push(routeType.list);
    }
  }

  async function handleCreate(data: FormData) {
    setLoading(true);
    try {
      const newPerson = (await BusinessContactsServices.createPerson({
        formData: data,
      })) as BCPersonsType;
      await getDataList(selectedOwner);
      setShowAlert({
        show: true,
        message: `${BCModule.singular} cadastrado com sucesso.`,
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      id = newPerson.id as string;
      history.push(`${routeType.details}/${newPerson.id}`);
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

  async function handleUpate(data: FormData) {
    setLoading(true);
    try {
      await BusinessContactsServices.updatePerson({ formData: data });
      setShowAlert({
        show: true,
        message: `${BCModule.singular} alterado com sucesso.`,
        type: WARNING_TYPES.INFO,
        time: 3000,
      });
      reloadList();
      history.push(routeType.list);
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
        await BusinessContactsServices.deleteOnePerson({ id: selected.id });
        setShowAlert({
          show: true,
          message: `${BCModule.singular} removido com sucesso.`,
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

  useEffect(() => {
    getDataList(selectedOwner);
  }, [selectedOwner]);

  const createSelect = () => {
    return (
      <select
        defaultValue={selectedOwner}
        className="rounded-md text-sm focus:ring-0 focus:ring-opacity-75 text-gray-900 focus:ring-primary-500 border-gray-300"
        onChange={(e) => setSelectedOwner(e.target.value)}
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

  function createButton() {
    return (
      <AddButton
        back={whatToShow !== "list"}
        backRoute={routeType.list}
        addRoute={routeType.add}
        reload={reloadList}
        isProfessional={profile?.isProfessional && profile.isAdmin}
      />
    );
  }

  return (
    <div className="container mx-auto">
      <Header
        before={[BCModule.plural]}
        main={selectedType as string}
        select={whatToShow === "list" ? createSelect : undefined}
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
            <List
              dataList={showDataList}
              detailsRoute={routeType.details}
              sort={sort}
              setSort={setSort}
            />
          )}
          {whatToShow === "details" && (
            <Details
              loading={loading}
              setLoading={setLoading}
              setShowAlert={setShowAlert}
              data={selected}
              places={places as PlacesType[]}
              setConfirm={setConfirm}
            />
          )}
          {whatToShow === "create" && (
            <Form
              loading={loading}
              type={selectedType}
              places={places}
              companies={companies}
              create={handleCreate}
            />
          )}
          {whatToShow === "update" && (
            <Form
              loading={loading}
              type={selectedType}
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
  );
}

export default BusinessContacts;
