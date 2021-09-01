import { Switch, Route } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import {
  Layout,
  SignIn,
  ForgotPassword,
  ChangePassword,
  SignUp,
} from "@iustitia/site/auth";
import { Dashboard } from "@iustitia/site/dashboard";

export const App = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Layout>
            <SignIn />
          </Layout>
        )}
      />
      <Route
        exact
        path={Routes.SignIn}
        render={() => (
          <Layout>
            <SignIn />
          </Layout>
        )}
      />
      <Route
        exact
        path={Routes.ForgotPassword}
        render={() => (
          <Layout>
            <ForgotPassword />
          </Layout>
        )}
      />
      <Route
        exact
        path={`${Routes.ChangePassword}/:urlcode?`}
        render={() => (
          <Layout>
            <ChangePassword />
          </Layout>
        )}
      />
      <Route
        exact
        path={`${Routes.SignUp}/:planParam?`}
        render={() => (
          <Layout>
            <SignUp />
          </Layout>
        )}
      />
      <Route exact path={Routes.Dashboard} component={Dashboard} />
    </Switch>
  );
};

export default App;
