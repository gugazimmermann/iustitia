import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../pages/layout/Layout';
import Main from '../pages/main/Main';
import Functionalities from '../pages/functionalities/Functionalities';
import Plans from '../pages/plans/Plans';
import Faq from '../pages/faq/Faq';
import Help from '../pages/help/Help';
import Suport from '../pages/suport/Suport';
import Terms from '../pages/terms/Terms';
import Privacity from '../pages/privacity/Privacity';
import AboutUs from '../pages/about-us/AboutUs';
import Contact from '../pages/contact/Contact';

export enum Routes {
  Functionalities = '/funcionalidades',
  Plans = '/planos',
  Faq = '/faq',
  Help = '/ajuda',
  Suport = '/suporte',
  Terms = '/termos',
  Privacity = '/privacidade',
  AboutUs = '/sobre-nos',
  Contact = '/contato',
  SignIn = '/entrar',
  SignUp = '/cadastro',
  ForgotPassword = '/esqueceu-senha',
  ChangePassword = '/nova-senha',
}

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
