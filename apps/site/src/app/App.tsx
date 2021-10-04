import { AuthRoutes } from "@iustitia/site/auth";
import { NotFoundRoutes } from "@iustitia/site/not-found";

export const App = () => {
  return (
    <>
      <AuthRoutes />
      <NotFoundRoutes />
    </>
  );
};

export default App;
