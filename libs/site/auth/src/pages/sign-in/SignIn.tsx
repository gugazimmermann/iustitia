import { Link as RouterLink, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { Title, Link } from "../..";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/user";
import { signin } from "../../services/auth";

type User = {
  email: string;
  password: string;
};

interface State {
  email: string;
}

export function SignIn() {
  const location = useLocation();
  const state = location.state as State;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>();
  const [loading, setLoading] = useState(false);
  const [cadastro, setCadastro] = useState(false);

  useEffect(() => {
    if (state?.email) {
      setValue("email", state.email);
      setCadastro(true);
    }
  }, [state, setValue]);

  const seeUser = async () => {
    try {
      const user = await getCurrentUser();
      console.log(user.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data: User) => {
    setLoading(true);
    try {
      const res = await signin(data);
      seeUser();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <Title title="Entre em seu escritório" />
        {cadastro && (
          <div
            className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 mt-3 shadow-md"
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
                <p className="font-bold py-1">
                  Cadastro realizado com sucesso!
                </p>
              </div>
            </div>
          </div>
        )}
        <section className="mt-5">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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
            <Link link={Routes.ForgotPassword} text="Esqueceu sua senha?" />
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
              disabled={loading}
            >
              Entrar
            </button>
          </form>
        </section>
      </main>

      <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className="text-white">
          Não tem uma conta?{" "}
          <RouterLink to={Routes.SignUp}>
            <span className="font-bold hover:underline">Cadastrar</span>.
          </RouterLink>
        </p>
      </div>
    </>
  );
}

export default SignIn;
