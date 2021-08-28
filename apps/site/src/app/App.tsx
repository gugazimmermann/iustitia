import { Switch, Route } from 'react-router-dom';

import SignIn from './pages/auth/sign-in/SignIn';
import ForgotPassword from './pages/auth/forgot-password/ForgotPassword';
import ChangePassword from './pages/auth/change-password/ChangePassword';
import SignUp from './pages/auth/sign-up/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import Layout from './pages/auth/layout/Layout'

export enum Routes {
  SignIn = '/entrar',
  ForgotPassword = '/esqueceu-senha',
  ChangePassword = '/mudar-senha',
  SignUp = '/cadastrar',
  Dashboard = '/dashboard',
}

export const App = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Layout><SignIn /></Layout>} />
      <Route exact path={Routes.SignIn} render={() => <Layout><SignIn /></Layout>} />
      <Route exact path={Routes.ForgotPassword} render={() => <Layout><ForgotPassword /></Layout>} />
      <Route exact path={Routes.ChangePassword} render={() => <Layout><ChangePassword /></Layout>} />
      <Route exact path={`${Routes.SignUp}/:planParam?`} render={() => <Layout><SignUp /></Layout>} />
      <Route exact path={Routes.Dashboard} component={Dashboard} />
    </Switch>
  );
};

export default App;
