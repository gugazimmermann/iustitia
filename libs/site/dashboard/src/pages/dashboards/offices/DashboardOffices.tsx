import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import {
  Header,
  InfoCard,
  INFOCARDSICONS,
} from "@iustitia/site/shared-components";
import { OfficeServices } from "@iustitia/site/services";

type OfficeInterface = OfficeServices.OfficeInterface;

export function DashboardOffices() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [offices, setOffices] = useState<OfficeInterface[]>();
  const [selectedOffice, setSelectedOffice] = useState({} as OfficeInterface);

  useEffect(() => {
    if (id) getOffice(id);
    else getOffices();
  }, [id]);

  async function getOffice(id: string) {
    try {
      const office = (await OfficeServices.getOne(id)) as OfficeInterface;
      setSelectedOffice(office);
    } catch (err) {
      console.log(err);
    }
  }

  async function getOffices() {
    try {
      const data = (await OfficeServices.getAll()) as OfficeInterface[];
      setOffices(data);
      if (data.length === 1) setSelectedOffice(data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const selectOffices = () => {
    return (
      <select
        id="offices"
        className={`rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 focus:ring-primary-500 border-gray-300`}
        onChange={(e) => {
          if (e.target.value) {
            history.push(`${Routes.DashboardEscritorios}/${e.target.value}`);
          } else {
            history.push(Routes.Dashboard);
          }
        }}
      >
        {offices && offices.length > 1 ? (
          <>
            <option value="">TODOS</option>
            {offices.map((office, i) => (
              <option key={i} value={office.id}>
                {office.name}
              </option>
            ))}
          </>
        ) : (
          offices &&
          offices[0]?.name && <option value="">{offices[0].name}</option>
        )}
      </select>
    );
  };

  return offices && offices?.length > 0 ? (
    <>
      <Header
        before={["Dashboards"]}
        main={
          selectedOffice.name
            ? `${selectedOffice.name}`
            : `Escritórios`
        }
        select={offices.length > 1 ? selectOffices : undefined}
      />

      <div className="mt-2">
        <div className="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
          <InfoCard
            title="Entradas"
            content="$0"
            badge="0%"
            badgeColor="gray"
            icon={INFOCARDSICONS.MONEY}
          />

          <InfoCard
            title="Despesas"
            content="$0"
            badge="0%"
            badgeColor="gray"
            icon={INFOCARDSICONS.GRAPH_UP}
          />

          <InfoCard
            title="Clientes Ativos"
            content="0"
            badge="0%"
            badgeColor="gray"
            icon={INFOCARDSICONS.PEOPLE}
          />

          <InfoCard
            title="Processos Ativos"
            content="0"
            badge="0%"
            badgeColor="gray"
            icon={INFOCARDSICONS.CASE}
          />
        </div>
      </div>
    </>
  ) : (
    <div></div>
  );
}

export default DashboardOffices;
