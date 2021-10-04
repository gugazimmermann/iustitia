import { GetComponentRoutes, ComponentsEnum } from "@iustitia/components";
import { AuthRoutesInterface } from "@iustitia/interfaces";
import { Link } from "react-router-dom";

const routes = GetComponentRoutes(ComponentsEnum.auth) as AuthRoutesInterface;

export function SignupLink() {
  return (
    <div className="max-w-lg mx-auto text-center mt-12 mb-6">
    <p className="text-white">
      Não tem uma conta?{" "}
      <Link to={routes.signUp}>
        <span className="font-bold hover:underline">Cadastrar</span>.
      </Link>
    </p>
  </div>
  );
}

export default SignupLink;
