import { Switch, Route } from "react-router-dom";
import { LandingPageRoutes as Routes } from '@iustitia/react-routes'
import {
  Layout,
  Main,
  Functionalities,
  Plans,
  Faq,
  Help,
  Suport,
  Terms,
  Privacity,
  AboutUs,
  Contact,
} from "@iustitia/landing-page/pages";

export const App = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Layout>
            <Main />
          </Layout>
        )}
      />
      <Route
        exact
        path={Routes.Functionalities}
        render={() => (
          <Layout>
            <Functionalities />
          </Layout>
        )}
      />
      <Route
        exact
        path={Routes.Plans}
        render={() => (
          <Layout>
            <Plans />
          </Layout>
        )}
      />
      <Route
        exact
        path={Routes.Faq}
        render={() => (
          <Layout>
            <Faq />
          </Layout>
        )}
      />
      <Route
        exact
        path={Routes.Help}
        render={() => (
          <Layout>
            <Help />
          </Layout>
        )}
      />
      <Route
        exact
        path={Routes.Suport}
        render={() => (
          <Layout>
            <Suport />
          </Layout>
        )}
      />
      <Route
        exact
        path={Routes.Terms}
        render={() => (
          <Layout>
            <Terms />
          </Layout>
        )}
      />
      <Route
        exact
        path={Routes.Privacity}
        render={() => (
          <Layout>
            <Privacity />
          </Layout>
        )}
      />
      <Route
        exact
        path={Routes.AboutUs}
        render={() => (
          <Layout>
            <AboutUs />
          </Layout>
        )}
      />
      <Route
        exact
        path={Routes.Contact}
        render={() => (
          <Layout>
            <Contact />
          </Layout>
        )}
      />
    </Switch>
  );
};

export default App;
