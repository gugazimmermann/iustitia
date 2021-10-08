import { Route, Switch } from "react-router";
import { PublicRoute, ProtectedRoute } from "@iustitia/routes";
import {
  AuthRoutesInterface,
  DashboardsRoutesInterface,
  GetRoutes,
  MembersRoutesInterface,
  ModulesEnum,
  PlacesRoutesInterface,
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
import { Places } from "@iustitia/site/places";
import { Members } from "@iustitia/site/members";
import { NotFound } from "@iustitia/site/not-found";

const authRoutes = GetRoutes(ModulesEnum.auth) as AuthRoutesInterface;
const dashboardsRoutes = GetRoutes(ModulesEnum.dashboards) as DashboardsRoutesInterface;
const profilesRoutes = GetRoutes(ModulesEnum.profiles) as ProfilesRoutesInterface;
const placesRoutes = GetRoutes(ModulesEnum.places) as PlacesRoutesInterface;
const membersRoutes = GetRoutes(ModulesEnum.members) as MembersRoutesInterface;

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
      <PublicRoute exact path={`${authRoutes.changePassword}/:urlcode?`}>
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

      <PublicRoute exact path={`${membersRoutes.invite}/:tenantId?/:code?`}>
        <AuthLayout>
          <Invite />
        </AuthLayout>
      </PublicRoute>

      <ProtectedRoute exact path={dashboardsRoutes.dashboards}>
        <Layout>
          <Dashboards />
        </Layout>
      </ProtectedRoute>

      <ProtectedRoute exact path={`${dashboardsRoutes.places}/:id?`}>
        <Layout>
          <Dashboards />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${dashboardsRoutes.process}/:id?`}>
        <Layout>
          <Dashboards />
        </Layout>
      </ProtectedRoute>

      <ProtectedRoute exact path={profilesRoutes.profile}>
        <Layout>
          <Profiles />
        </Layout>
      </ProtectedRoute>

      <ProtectedRoute exact path={placesRoutes.list}>
        <Layout>
          <Places />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${placesRoutes.details}/:id`}>
        <Layout>
          <Places />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${placesRoutes.add}/:id`}>
        <Layout>
          <Places />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${placesRoutes.update}/:id`}>
        <Layout>
          <Places />
        </Layout>
      </ProtectedRoute>

      <ProtectedRoute exact path={membersRoutes.list}>
        <Layout>
          <Members />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${membersRoutes.details}/:id`}>
        <Layout>
          <Members />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${membersRoutes.add}/:id`}>
        <Layout>
          <Members />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${membersRoutes.update}/:id`}>
        <Layout>
          <Members />
        </Layout>
      </ProtectedRoute>

      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default App;
