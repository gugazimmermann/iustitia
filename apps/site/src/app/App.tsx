import { Route, Switch } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import ProtectedRoute from "./routes/protected-route/ProtectedRoute";
import PublicRoute from "./routes/public-route/PublicRoute";
import {
  ChangePassword,
  ForgotPassword,
  Layout as AuthLayout,
  SignIn,
  SignUp,
  Plan,
  Subscription,
} from "@iustitia/site/auth";
import { Layout } from "@iustitia/site/layout";
import {
  DashboardOffices,
  NotFound,
  Profile,
  Offices,
  Subscriptions,
} from "@iustitia/site/dashboard";
import { Contacts } from "@iustitia/site/contacts";
import { Schedule } from "@iustitia/site/schedule";
import { Calendar } from "@iustitia/site/calendar";

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
      <PublicRoute exact path={`${Routes.SignUp}`}>
        <AuthLayout>
          <SignUp />
        </AuthLayout>
      </PublicRoute>
      <PublicRoute exact path={`${Routes.Plan}`}>
        <AuthLayout>
          <Plan />
        </AuthLayout>
      </PublicRoute>
      <PublicRoute exact path={`${Routes.Subscription}`}>
        <AuthLayout>
          <Subscription />
        </AuthLayout>
      </PublicRoute>
      <ProtectedRoute exact path={Routes.Dashboard}>
        <Layout>
          <DashboardOffices />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${Routes.DashboardEscritorios}/:id?`}>
        <Layout>
          <DashboardOffices />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={Routes.DashboardProcessos}>
        <Layout>
          <DashboardOffices />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${Routes.DashboardProcessos}/:id?`}>
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
      <ProtectedRoute exact path={Routes.Subscriptions}>
        <Layout>
          <Subscriptions />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={Routes.Contacts}>
        <Layout>
          <Contacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${Routes.Contacts}/:id?`}>
        <Layout>
          <Contacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={Routes.Schedule}>
        <Layout>
          <Schedule />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={Routes.Calendar}>
        <Layout>
          <Calendar />
        </Layout>
      </ProtectedRoute>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default App;
