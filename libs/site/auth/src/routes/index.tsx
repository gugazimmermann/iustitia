import { GetRoutes, ModulesEnum, AuthRoutesInterface } from "@iustitia/modules";
import { PublicRoute } from "@iustitia/routes";
import { Layout, SignIn, ForgotPassword, ChangePassword, SignUp, Plans, Subscription } from "../pages";

const authRoutes = GetRoutes(ModulesEnum.auth) as AuthRoutesInterface;

export function AuthRoutes() {
  return (
    <>
      <PublicRoute exact path="/">
        <Layout>
          <SignIn />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={authRoutes.signIn}>
        <Layout>
          <SignIn />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={authRoutes.forgotPassword}>
        <Layout>
          <ForgotPassword />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={`${authRoutes.changePassword}/:urlcode?`}>
        <Layout>
          <ChangePassword />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={`${authRoutes.signUp}`}>
        <Layout>
          <SignUp />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={`${authRoutes.plans}`}>
        <Layout>
          <Plans />
        </Layout>
      </PublicRoute>
      <PublicRoute exact path={`${authRoutes.subscription}`}>
        <Layout>
          <Subscription />
        </Layout>
      </PublicRoute>
    </>
  );
}

export default AuthRoutes;
