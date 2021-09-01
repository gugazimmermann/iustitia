import { Link as RouterLink } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import "./SignupLink.css";

/* eslint-disable-next-line */
export interface SignupLinkProps {}

export function SignupLink(props: SignupLinkProps) {
  return (
    <div className="max-w-lg mx-auto text-center mt-12 mb-6">
    <p className="text-white">
      Não tem uma conta?{" "}
      <RouterLink to={Routes.SignUp}>
        <span className="font-bold hover:underline">Cadastrar</span>.
      </RouterLink>
    </p>
  </div>
  );
}

export default SignupLink;
