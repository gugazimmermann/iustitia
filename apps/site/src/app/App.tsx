import { Switch } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import {
  ChangePassword,
  ForgotPassword,
  Layout,
  SignIn,
  SignUp,
} from "@iustitia/site/auth";
import { Dashboard } from "@iustitia/site/dashboard";
import ProtectedRoute from "./routes/protected-route/ProtectedRoute";
import PublicRoute from "./routes/public-route/PublicRoute";

export const App = () => {
  return (
    <Switch>
      <PublicRoute exact path="/">
        <Layout>
          <SignIn />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={Routes.SignIn}>
        <Layout>
          <SignIn />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={Routes.ForgotPassword}>
        <Layout>
          <ForgotPassword />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={`${Routes.ChangePassword}/:urlcode?`}>
        <Layout>
          <ChangePassword />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={`${Routes.SignUp}/:planParam?`}>
        <Layout>
          <SignUp />
        </Layout>
      </PublicRoute>
      <ProtectedRoute exact path={Routes.Dashboard}>
      <Dashboard />
      </ProtectedRoute>
    </Switch>
  );
};

export default App;
