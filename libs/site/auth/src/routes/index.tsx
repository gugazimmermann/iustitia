import { AuthRoutesInterface } from "@iustitia/interfaces";
import { GetComponentRoutes, ComponentsEnum } from "@iustitia/components";
import { PublicRoute } from "@iustitia/routes";
import { Layout, SignIn, ForgotPassword, ChangePassword, SignUp, Plans, Subscription } from "../pages";

const routes = GetComponentRoutes(ComponentsEnum.auth) as AuthRoutesInterface;

export function AuthRoutes() {
  return (
    <>
      <PublicRoute exact path="/">
        <Layout>
          <SignIn />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={routes.signIn}>
        <Layout>
          <SignIn />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={routes.forgotPassword}>
        <Layout>
          <ForgotPassword />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={`${routes.changePassword}/:urlcode?`}>
        <Layout>
          <ChangePassword />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={`${routes.signUp}`}>
        <Layout>
          <SignUp />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={`${routes.plans}`}>
        <Layout>
          <Plans />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={`${routes.subscription}`}>
        <Layout>
          <Subscription />
        </Layout>
      </PublicRoute>
    </>
  );
}

export default AuthRoutes;
