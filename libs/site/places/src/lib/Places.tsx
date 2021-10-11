import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  AddButton,
  Alert,
  AlertInterface,
  BasicPlanMsg,
  ConfirmationModal,
  Header,
  SearchField,
} from "@iustitia/site/shared-components";
import { Sort, WARNING_TYPES } from "@iustitia/site/shared-utils";

import {
  MembersServices,
  PlacesServices,
  ProfilesServices,
} from "@iustitia/site/services";
import {
  GetRoutes,
  GetModule,
  ModulesEnum,
  ModulesInterface,
  PlacesRoutesInterface,
} from "@iustitia/modules";
import { Details, Form, List } from "./components";

const placesModule = GetModule(ModulesEnum.places) as ModulesInterface;
const placesRoutes = GetRoutes(ModulesEnum.places) as PlacesRoutesInterface;

type PlacesType = PlacesServices.PlacesRes;
type ProfilesListType = PlacesServices.ProfilesListRes;
type ProfilesType = ProfilesServices.ProfilesRes;
type MembersSimpleType = MembersServices.MembersSimpleRes;

export function convertProfileToSimpleProfile(profiles: ProfilesListType[]) {
  const simpleProfiles: MembersSimpleType[] = [];
  for (const profile of profiles)
    simpleProfiles.push(profile as unknown as MembersSimpleType);
  return simpleProfiles;
}

interface PlacesProps {
  profile?: ProfilesType;
  setPlaces?(countPlaces: number): void;
}

export function Places({ profile, setPlaces }: PlacesProps) {
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
  const [dataList, setDataList] = useState([] as PlacesType[]);
  const [showDataList, setShowDataList] = useState([] as PlacesType[]);
  const [selected, setSelected] = useState({} as PlacesType);
  const [confirm, setConfirm] = useState(false);
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
      let data = (await PlacesServices.getAll()) as PlacesType[];
      if (setPlaces) setPlaces(data.length);
      if (!profile?.isAdmin) data = data.filter((d) => d.active);
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
      const data = (await PlacesServices.getOne({ id })) as PlacesType;
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
      history.push(placesRoutes.list);
    }
  }

  async function handleCreate(data: PlacesType) {
    setLoading(true);
    try {
      const newPlace = (await PlacesServices.create({
        formData: data,
      })) as PlacesType;
      setShowAlert({
        show: true,
        message: `${placesModule.singular} cadastrado com sucesso!`,
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      await getDataList();
      id = newPlace.id as string;
      history.push(`${placesRoutes.details}/${newPlace.id}`);
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

  async function handleUpate(data: PlacesType) {
    setLoading(true);
    try {
      await PlacesServices.update({ formData: data });
      setShowAlert({
        show: true,
        message: `${placesModule.singular} alterado com sucesso!`,
        type: WARNING_TYPES.WARNING,
        time: 3000,
      });
      reloadList();
      history.push(placesRoutes.list);
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
        await PlacesServices.deleteOne({ id: selected.id });
        setShowAlert({
          show: true,
          message: `${placesModule.singular} removido com sucesso!`,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
        reloadList();
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setShowAlert({
          ...showAlert,
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
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
        (d.name as string).toLocaleLowerCase().includes(searchParam.toLocaleLowerCase())
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
        backRoute={placesRoutes.list}
        addRoute={placesRoutes.add}
        reload={reloadList}
        isProfessional={profile?.isProfessional && profile.isAdmin}
      />
    );
  }

  return (
    <div className="container mx-auto">
      <Header
        before={[]}
        main={placesModule.plural}
        search={createSearch}
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
              setLoading={setLoading}
              setShowAlert={setShowAlert}
              data={selected}
              setData={setSelected}
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
              title={`Excluir ${placesModule.singular}: ${selected.name}?`}
              content={`Você tem certeza que quer excluir o ${placesModule.singular} ${selected.name}? Todos os dados desse ${placesModule.singular} serão perdidos. Essa ação não poderá ser desfeita.`}
              action={handleDelete}
            />
          )}
          {!profile?.isProfessional && (
            <BasicPlanMsg
              message={`Somente 1 ${placesModule.singular} permitido no Plano Básico`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Places;
