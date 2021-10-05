import { GetRoutes, ModulesEnum, AuthRoutesInterface } from "@iustitia/modules";
import { Link } from "react-router-dom";

const authRoutes = GetRoutes(ModulesEnum.auth) as AuthRoutesInterface;

export function SignupLink() {
  return (
    <div className="max-w-lg mx-auto text-center mt-12 mb-6">
    <p className="text-white">
      Não tem uma conta?{" "}
      <Link to={authRoutes.signUp}>
        <span className="font-bold hover:underline">Cadastrar</span>.
      </Link>
    </p>
  </div>
  );
}

export default SignupLink;
