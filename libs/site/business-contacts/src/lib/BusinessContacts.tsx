import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  AddButton,
  Alert,
  AlertInterface,
  ConfirmationModal,
  DefaultAlert,
  Header,
  SearchField,
} from "@iustitia/site/shared-components";
import { Sort, SORT_TYPES, WARNING_TYPES } from "@iustitia/site/shared-utils";
import {
  BusinessContactsServices as BCServices,
  MembersServices,
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
import { filterOnwer, getRouteType, seeType } from "./utils";

const BCModule = GetModule(ModulesEnum.businessContacts) as ModulesInterface;
const BCRoutes = GetRoutes(ModulesEnum.businessContacts) as BCRoutesInterface;

type BCTypes = BCServices.BCTypes;
type BCPersonsType = BCServices.BCPersonsRes;
type BCCompaniesType = BCServices.BCCompaniesRes;
type ProfilesType = ProfilesServices.ProfilesRes;
type ProfilesListType = PlacesServices.ProfilesListRes;
type PlacesType = PlacesServices.PlacesRes;

interface BusinessContactsProps {
  profile?: ProfilesType;
}

type toShow = "list" | "details" | "update" | "create";

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
  const [showAlert, setShowAlert] = useState<AlertInterface>(DefaultAlert);
  const [whatToShow, setWhatToShow] = useState<toShow>();

  const [members, setMembers] = useState<ProfilesListType[]>([]);
  const [places, setPlaces] = useState<PlacesType[]>([]);
  const [companies, setCompanies] = useState<BCCompaniesType[]>([]);

  const [confirm, setConfirm] = useState(false);
  const [dataList, setDataList] = useState<BCPersonsType[]>();
  const [showDataList, setShowDataList] = useState<BCPersonsType[]>();
  const [selected, setSelected] = useState<BCPersonsType>();
  const [selectedOwner, setSelectedOwner] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<BCTypes>();
  const [routeType, setRouteType] = useState({} as routeTypeInterface);
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState<SORT_TYPES>(SORT_TYPES.ASC);

  useEffect(() => {
    getMembers();
    getPlaces();
    getCompanies();
  }, []);

  useEffect(() => {
    setSelectedType(seeType(pathname));
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

  useEffect(() => {
    const routes = getRouteType(BCRoutes, selectedType);
    setRouteType(routes);
  }, [selectedType]);

  useEffect(() => {
    getDataList(selectedOwner);
  }, [selectedOwner]);

  async function reloadList() {
    await getDataList(selectedOwner);
    setWhatToShow("list");
  }

  async function getMembers() {
    try {
      const membersData =
        (await MembersServices.getAll()) as ProfilesListType[];
      if (membersData.length) setMembers(membersData);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  }

  async function getPlaces() {
    try {
      const placesData = (await PlacesServices.getAll()) as PlacesType[];
      const placesFilter = placesData.filter((p) => p.active);
      if (placesFilter.length) setPlaces(placesFilter);
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
      const companies = await BCServices.getAllCompanies();
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

  async function getDataList(selectedOwner: string) {
    setLoading(true);
    try {
      const allData = (await BCServices.getAllPersons({
        type: seeType(pathname),
      })) as BCPersonsType[];
      const data = filterOnwer(allData, selectedOwner, profile?.id as string);
      setDataList(data);
      setShowDataList(Sort(data.slice(0), sort));
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
      const data = await BCServices.getOnePerson({ id });
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
      const newPerson = (await BCServices.createPerson({
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
      await BCServices.updatePerson({ formData: data });
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
    if (selected?.id) {
      setLoading(true);
      try {
        await BCServices.deleteOnePerson({ id: selected.id });
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
    if (dataList) {
      const sortedData = Sort(dataList.slice(0), sort);
      setShowDataList(sortedData);
    }
  }, [sort]);

  useEffect(() => {
    const data = dataList?.length ? dataList.slice(0) : [];
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

  const createSelect = () => {
    return (
      <select
        defaultValue={selectedOwner}
        className="rounded-md text-sm focus:ring-0 focus:ring-opacity-75 text-gray-900 focus:ring-primary-500 border-gray-300"
        onChange={(e) => setSelectedOwner(e.target.value)}
      >
        <option value={"All"}>Todos</option>
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
              setData={setSelected}
              setConfirm={setConfirm}
              places={places}
              members={members}
            />
          )}
          {whatToShow === "create" && (
            <Form
              loading={loading}
              type={selectedType}
              companies={companies}
              create={handleCreate}
            />
          )}
          {whatToShow === "update" && (
            <Form
              loading={loading}
              type={selectedType}
              data={selected}
              companies={companies}
              update={handleUpate}
            />
          )}
          {confirm && (
            <ConfirmationModal
              setConfirm={setConfirm}
              type={WARNING_TYPES.ERROR}
              title={`Excluir ${BCModule.singular}: ${selected?.name}?`}
              content={`Você tem certeza que quer excluir o ${BCModule.singular} ${selected?.name}? Todos os dados desse ${BCModule.singular} serão perdidos. Essa ação não poderá ser desfeita.`}
              action={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BusinessContacts;
