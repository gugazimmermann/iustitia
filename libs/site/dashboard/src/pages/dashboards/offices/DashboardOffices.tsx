import { useState, useEffect } from "react";
import Header from "../../../components/dashboard/header/Header";
import InfoCard, {
  INFOCARDSICONS,
} from "../../../components/dashboard/info-card/InfoCard";
import { IOffice } from "../../../interfaces";
import { getOne } from "../../../services/office";

interface DashboardOfficesProps {
  offices?: IOffice[];
}

export function DashboardOffices({ offices }: DashboardOfficesProps) {
  const [officeId, setOfficeId] = useState("");
  const [selectedOffice, setSelectedOffice] = useState({} as IOffice);
  const selectOffices = () => {
    return (
      <select
        id="offices"
        className={`rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 focus:ring-primary-500 border-gray-300`}
        onChange={(e) => {
          setOfficeId(e.target.value);
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

  useEffect(() => {
    if (officeId) {
      getOffice(officeId)
    }
  }, [officeId]);

  async function getOffice(id: string) {
    try {
      const office = await getOne(id);
      setSelectedOffice(office)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header
        before={["Dashboards"]}
        main={selectedOffice.name ? `Escritório: ${selectedOffice.name}` : `Escritórios`}
        select={selectOffices}
        hide={true}
      />
      <div className="mt-2">
        <div className="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
          <InfoCard
            title="Entradas"
            content="$30.000"
            badge="+4.5%"
            badgeColor="blue"
            icon={INFOCARDSICONS.MONEY}
          />

          <InfoCard
            title="Despesas"
            content="$16.000"
            badge="+1.8%"
            badgeColor="red"
            icon={INFOCARDSICONS.GRAPH_UP}
          />

          <InfoCard
            title="Clientes Ativos"
            content="35"
            badge="+2.6%"
            badgeColor="green"
            icon={INFOCARDSICONS.PEOPLE}
          />

          <InfoCard
            title="Processos Ativos"
            content="56"
            badge="+5.2%"
            badgeColor="green"
            icon={INFOCARDSICONS.CASE}
          />
        </div>
      </div>
    </>
  );
}

export default DashboardOffices;
