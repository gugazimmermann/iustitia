import { AuthRoutes } from "@iustitia/site/auth";
import { DashboardsRoutes } from "@iustitia/site/dashboards";
import { NotFoundRoutes } from "@iustitia/site/not-found";

export const App = () => {
  return (
    <>
      <AuthRoutes />
      <DashboardsRoutes />
      <NotFoundRoutes />
    </>
  );
};

export default App;
