import { GetRoutes, ModulesEnum, DashboardsRoutesInterface } from "@iustitia/modules";
import { ProtectedRoute } from "@iustitia/routes";
import { Layout } from "@iustitia/site/layout";
import Dashboards from "../Dashboards";

const dashboardsRoutes = GetRoutes(ModulesEnum.dashboards) as DashboardsRoutesInterface;

export function DashboardsRoutes() {
  return (
    <>
      <ProtectedRoute exact path={dashboardsRoutes.dashboards}>
        <Layout>
          <Dashboards />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={dashboardsRoutes.places}>
        <Layout>
          <Dashboards />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={dashboardsRoutes.process}>
        <Layout>
          <Dashboards />
        </Layout>
      </ProtectedRoute>
    </>
  );
}

export default DashboardsRoutes;
