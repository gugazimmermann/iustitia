import { Route, Switch } from "react-router";
import { PublicRoute, ProtectedRoute } from "@iustitia/routes";
import {
  AuthRoutesInterface,
  DashboardsRoutesInterface,
  GetRoutes,
  ModulesEnum,
  ProfilesRoutesInterface,
} from "@iustitia/modules";
import {
  Layout as AuthLayout,
  SignIn,
  SignUp,
  Plans,
  Subscription,
  ForgotPassword,
  ChangePassword,
  Invite,
} from "@iustitia/site/auth";
import { Layout } from "@iustitia/site/layout";
import { Dashboards } from "@iustitia/site/dashboards";
import { Profiles } from "@iustitia/site/profiles";
import { NotFound } from "@iustitia/site/not-found";

const authRoutes = GetRoutes(ModulesEnum.auth) as AuthRoutesInterface;
const dashboardsRoutes = GetRoutes(
  ModulesEnum.dashboards
) as DashboardsRoutesInterface;
const profilesRoutes = GetRoutes(
  ModulesEnum.profiles
) as ProfilesRoutesInterface;

export const App = () => {
  return (
    <Switch>
      <PublicRoute exact path="/">
        <AuthLayout>
          <SignIn />
        </AuthLayout>
      </PublicRoute>
      <PublicRoute exact path={authRoutes.signIn}>
        <AuthLayout>
          <SignIn />
        </AuthLayout>
      </PublicRoute>
      <PublicRoute exact path={authRoutes.forgotPassword}>
        <AuthLayout>
          <ForgotPassword />
        </AuthLayout>
      </PublicRoute>
      <PublicRoute exact path={authRoutes.changePassword}>
        <AuthLayout>
          <ChangePassword />
        </AuthLayout>
      </PublicRoute>
      <PublicRoute exact path={authRoutes.signUp}>
        <AuthLayout>
          <SignUp />
        </AuthLayout>
      </PublicRoute>
      <PublicRoute exact path={authRoutes.plans}>
        <AuthLayout>
          <Plans />
        </AuthLayout>
      </PublicRoute>
      <PublicRoute exact path={authRoutes.subscription}>
        <AuthLayout>
          <Subscription />
        </AuthLayout>
      </PublicRoute>

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

      <ProtectedRoute exact path={profilesRoutes.profile}>
        <Layout>
          <Profiles />
        </Layout>
      </ProtectedRoute>

      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default App;
