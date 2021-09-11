import { Route, Switch } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import {
  ChangePassword,
  ForgotPassword,
  Layout as AuthLayout,
  SignIn,
  SignUp,
} from "@iustitia/site/auth";
import { Layout, DashboardOffices, NotFound, Profile, Offices } from "@iustitia/site/dashboard";
import ProtectedRoute from "./routes/protected-route/ProtectedRoute";
import PublicRoute from "./routes/public-route/PublicRoute";

export const App = () => {
  return (
    <Switch>
      <PublicRoute exact path="/">
        <AuthLayout>
          <SignIn />
        </AuthLayout>
      </PublicRoute>
      <PublicRoute exact path={Routes.SignIn}>
        <AuthLayout>
          <SignIn />
        </AuthLayout>
      </PublicRoute>
      <PublicRoute exact path={Routes.ForgotPassword}>
        <AuthLayout>
          <ForgotPassword />
        </AuthLayout>
      </PublicRoute>
      <PublicRoute exact path={`${Routes.ChangePassword}/:urlcode?`}>
        <AuthLayout>
          <ChangePassword />
        </AuthLayout>
      </PublicRoute>
      <PublicRoute exact path={`${Routes.SignUp}/:planParam?`}>
        <AuthLayout>
          <SignUp />
        </AuthLayout>
      </PublicRoute>
      <ProtectedRoute exact path={Routes.Dashboard}>
        <Layout>
          <DashboardOffices />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={Routes.Profile}>
        <Layout>
          <Profile />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={Routes.Offices}>
        <Layout>
          <Offices />
        </Layout>
      </ProtectedRoute>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default App;
