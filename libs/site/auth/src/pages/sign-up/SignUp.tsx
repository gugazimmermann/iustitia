import { useEffect, useState } from "react";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { AlertError, LoadingButton } from "@iustitia/site/shared-components";
import { validateEmail } from "@iustitia/site/shared-utils";
import { Title } from "../..";
import { signup } from "../../services/auth";

type Form = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

interface useParamsProps {
  planParam: string;
}

// TODO: send a welcome email
export function SignUp() {
  const history = useHistory();
  const { planParam } = useParams<useParamsProps>();
  const [plan, setPlan] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    switch (planParam) {
      case "gratuito":
        setPlan("Gratuito");
        break;
      case "basico":
        setPlan("Básico");
        break;
      case "profissional":
        setPlan("Profissional");
        break;
      default:
        setPlan("Gratuito");
    }
  }, [planParam]);

  const onSubmit = async (form: Form) => {
    setLoading(true);
    setError("");
    if (!validateEmail(form.email)) {
      setError("Email inválido!");
      setLoading(false);
      return;
    }
    if (form.password !== form.repeatPassword) {
      setError("Senhas são diferentes!");
      setLoading(false);
      return;
    }
    try {
      await signup(form);
      setLoading(false);
      history.push(Routes.SignIn, { email: form.email });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      setLoading(false);
    }
  };

  return (
    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      <Title
        title="Cadastro"
        subtitle="Faça seu cadastro no plano"
        plan={plan}
      />
      {error && <AlertError text={error} />}
      <section className="mt-5">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="username"
            >
              Nome
            </label>
            <input
              type="text"
              id="username"
              {...register("name", { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-3 pb-3 ` +
                (errors.name ? `border-red-600 ` : `focus:border-primary-600`)
              }
            />
          </div>
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email", { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-3 pb-3 ` +
                (errors.email ? `border-red-600 ` : `focus:border-primary-600`)
              }
            />
          </div>
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-3 pb-3 ` +
                (errors.password
                  ? `border-red-600 `
                  : `focus:border-primary-600`)
              }
            />
          </div>
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="repeatPassword"
            >
              Repita a Senha
            </label>
            <input
              type="password"
              id="repeatPassword"
              {...register("repeatPassword", { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-3 pb-3 ` +
                (errors.repeatPassword
                  ? `border-red-600 `
                  : `focus:border-primary-600`)
              }
            />
          </div>
          <div className="flex justify-end">
            <RouterLink to="/entrar">
              <div className="text-sm text-primary-600 hover:text-primary-700 hover:underline mb-6">
                Voltar para Entrar
              </div>
            </RouterLink>
          </div>
          <LoadingButton
            styles="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
            text="Cadastrar"
            loading={loading}
          />
        </form>
      </section>
    </main>
  );
}

export default SignUp;
