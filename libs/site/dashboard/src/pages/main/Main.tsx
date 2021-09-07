import Header from "../../components/dashboard/header/Header";
import InfoCard, {
  INFOCARDSICONS,
} from "../../components/dashboard/info-card/InfoCard";

export function Main() {
  return (
    <>
      <Header before={["Dashboards"]} main="Escritório" />
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

export default Main;
