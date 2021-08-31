import { useEffect, useState } from "react";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { useForm } from "react-hook-form";
import { Title } from "../..";
import { signup } from "../../services/auth";

type User = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

interface useParamsProps {
  planParam: string;
}

export function SignUp() {
  const history = useHistory();
  const { planParam } = useParams<useParamsProps>();
  const [plan, setPlan] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
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

  const onSubmit = async (data: User) => {
    setLoading(true);
    setError("");
    try {
      await signup(data);
      history.push(Routes.SignIn, { email: data.email });
      setLoading(false);
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
      {error && (
        <div
          className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 mt-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold py-1">{error}</p>
            </div>
          </div>
        </div>
      )}
      <section className="mt-5">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="nome"
            >
              Nome
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-3 pb-3 ` +
                (errors.username
                  ? `border-red-600 `
                  : `focus:border-purple-600`)
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
                (errors.email ? `border-red-600 ` : `focus:border-purple-600`)
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
                  : `focus:border-purple-600`)
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
                  : `focus:border-purple-600`)
              }
            />
          </div>
          <div className="flex justify-end">
            <RouterLink to="/entrar">
              <div className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">
                Voltar para Entrar
              </div>
            </RouterLink>
          </div>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
            disabled={loading}
          >
            Cadastrar
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignUp;
