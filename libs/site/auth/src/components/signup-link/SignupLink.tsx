import { Link } from "react-router-dom";
import { SiteRoutes } from "@iustitia/react-routes";

/* eslint-disable-next-line */
export interface SignupLinkProps {}

export function SignupLink(props: SignupLinkProps) {
  return (
    <div className="max-w-lg mx-auto text-center mt-12 mb-6">
    <p className="text-white">
      Não tem uma conta?{" "}
      <Link to={SiteRoutes.SignUp}>
        <span className="font-bold hover:underline">Cadastrar</span>.
      </Link>
    </p>
  </div>
  );
}

export default SignupLink;
