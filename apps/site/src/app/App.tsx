import { Switch, Route } from 'react-router-dom';

import SignIn from './pages/auth/sign-in/SignIn';
import ForgotPassword from './pages/auth/forgot-password/ForgotPassword';
import ChangePassword from './pages/auth/change-password/ChangePassword';
import Dashboard from './pages/dashboard/Dashboard';
import Layout from './pages/auth/layout/Layout'

export enum Routes {
  SignIn = '/entrar',
  ForgotPassword = '/esqueceu-senha',
  ChangePassword = '/mudar-senha',
  Dashboard = '/dashboard',
}

export const App = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Layout><SignIn /></Layout>} />
      <Route exact path={Routes.SignIn} render={() => <Layout><SignIn /></Layout>} />
      <Route exact path={Routes.ForgotPassword} render={() => <Layout><ForgotPassword /></Layout>} />
      <Route exact path={Routes.ChangePassword} render={() => <Layout><ChangePassword /></Layout>} />
      <Route exact path={Routes.Dashboard} component={Dashboard} />
    </Switch>
  );
};

export default App;
