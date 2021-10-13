import { Route, Switch } from "react-router";
import { PublicRoute, ProtectedRoute } from "@iustitia/routes";
import {
  AuthRoutesInterface,
  BCRoutesInterface,
  DashboardsRoutesInterface,
  GetRoutes,
  MembersRoutesInterface,
  ModulesEnum,
  PlacesRoutesInterface,
  ProfilesRoutesInterface,
  ScheduleRoutesInterface,
  SubscriptionsRoutesInterface,
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
import { Subscriptions } from "@iustitia/site/subscriptions";
import { Places } from "@iustitia/site/places";
import { Members } from "@iustitia/site/members";
import { BusinessContacts, Companies } from "@iustitia/site/business-contacts";
import { Calendar} from "@iustitia/site/schedule";
import { NotFound } from "@iustitia/site/not-found";

const authRoutes = GetRoutes(ModulesEnum.auth) as AuthRoutesInterface;
const dashboardsRoutes = GetRoutes(ModulesEnum.dashboards) as DashboardsRoutesInterface;
const profilesRoutes = GetRoutes(ModulesEnum.profiles) as ProfilesRoutesInterface;
const subscriptionsRoutes = GetRoutes(ModulesEnum.subscriptions) as SubscriptionsRoutesInterface;
const placesRoutes = GetRoutes(ModulesEnum.places) as PlacesRoutesInterface;
const membersRoutes = GetRoutes(ModulesEnum.members) as MembersRoutesInterface;
const businessContactsRoutes = GetRoutes(ModulesEnum.businessContacts) as BCRoutesInterface;
const scheduleRoutes = GetRoutes(ModulesEnum.schedule) as ScheduleRoutesInterface;


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

      <ProtectedRoute exact path={subscriptionsRoutes.subscription}>
        <Layout>
          <Subscriptions />
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
      <ProtectedRoute exact path={`${placesRoutes.add}`}>
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
      <ProtectedRoute exact path={`${membersRoutes.add}`}>
        <Layout>
          <Members />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${membersRoutes.update}/:id`}>
        <Layout>
          <Members />
        </Layout>
      </ProtectedRoute>

      <ProtectedRoute exact path={businessContactsRoutes.listPersons}>
        <Layout>
          <BusinessContacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${businessContactsRoutes.detailsPerson}/:id`}>
        <Layout>
          <BusinessContacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${businessContactsRoutes.addPerson}`}>
        <Layout>
          <BusinessContacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${businessContactsRoutes.updatePerson}/:id`}>
        <Layout>
          <BusinessContacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={businessContactsRoutes.listContacts}>
        <Layout>
          <BusinessContacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${businessContactsRoutes.detailsContact}/:id`}>
        <Layout>
          <BusinessContacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${businessContactsRoutes.addContact}`}>
        <Layout>
          <BusinessContacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${businessContactsRoutes.updateContact}/:id`}>
        <Layout>
          <BusinessContacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={businessContactsRoutes.listSuppliers}>
        <Layout>
          <BusinessContacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${businessContactsRoutes.detailsSupplier}/:id`}>
        <Layout>
          <BusinessContacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${businessContactsRoutes.addSupplier}`}>
        <Layout>
          <BusinessContacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${businessContactsRoutes.updateSupplier}/:id`}>
        <Layout>
          <BusinessContacts />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={businessContactsRoutes.listCompanies}>
        <Layout>
          <Companies />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${businessContactsRoutes.detailsCompany}/:id`}>
        <Layout>
          <Companies />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${businessContactsRoutes.addCompany}`}>
        <Layout>
          <Companies />
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute exact path={`${businessContactsRoutes.updateCompany}/:id`}>
        <Layout>
          <Companies />
        </Layout>
      </ProtectedRoute>

      <ProtectedRoute exact path={`${scheduleRoutes.calendar}`}>
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
