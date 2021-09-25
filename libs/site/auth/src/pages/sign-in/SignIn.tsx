import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { Alert, LoadingButton } from "@iustitia/site/shared-components";
import { validateEmail, WARNING_TYPES } from "@iustitia/site/shared-utils";
import { AuthService } from "@iustitia/site/services";
import { Title, Link, SignupLink } from "../..";

type Form = {
  email: string;
  password: string;
};

interface State {
  email: string;
  changePassword: boolean;
}

export function SignIn() {
  const history = useHistory();
  const location = useLocation();
  const state = location.state as State;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Form>();
  const [loading, setLoading] = useState(false);
  const [changepassword, setChangepassword] = useState(false);
  const [cadastro, setCadastro] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state?.email) {
      setValue("email", state.email);
      setCadastro(true);
    }
    if (state?.changePassword) {
      setChangepassword(true);
    }
  }, [state, setValue]);

  const onSubmit = async (form: Form) => {
    setChangepassword(false);
    setCadastro(false);
    setLoading(true);
    setError("");
    if (!validateEmail(form.email)) {
      setError("Email inválido!");
      setLoading(false);
      return;
    }
    try {
      await AuthService.signin(form);
      setLoading(false);
      history.push(Routes.Dashboard);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      setLoading(false);
    }
  };

  return (
    <>
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <Title title="Entre em seu escritório" />
        {changepassword && <Alert type={WARNING_TYPES.SUCCESS} message="Senha alterada com sucesso!" />}
        {cadastro && <Alert type={WARNING_TYPES.SUCCESS} message="Cadastro realizado com sucesso!" />}
        {error && <Alert type={WARNING_TYPES.ERROR} message={error} />}
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
                  (errors.email
                    ? `border-red-600 `
                    : `focus:border-primary-600`)
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
            <Link link={Routes.ForgotPassword} text="Esqueceu sua senha?" />
            <LoadingButton
              styles="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
              text="Entrar"
              loading={loading}
            />
          </form>
        </section>
      </main>
      <SignupLink />
    </>
  );
}

export default SignIn;
