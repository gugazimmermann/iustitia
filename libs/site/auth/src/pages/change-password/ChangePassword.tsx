import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Alert,
  AlertInterface,
  LoadingButton,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { AuthServices } from "@iustitia/site/services";
import { GetRoutes, ModulesEnum, AuthRoutesInterface } from "@iustitia/modules";
import { Link, Title } from "../../components";

const authRoutes = GetRoutes(ModulesEnum.auth) as AuthRoutesInterface;

interface State {
  email: string;
  date: string;
}

type Form = {
  code: string;
  newpassword: string;
  repeatnewpassword: string;
};

interface useParamsProps {
  urlcode: string;
}

export function ChangePassword() {
  const { urlcode } = useParams<useParamsProps>();
  const [codeurl, setCodeurl] = useState(urlcode);
  const location = useLocation();
  const [state, setState] = useState(location.state as State);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Form>();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: "",
    type: WARNING_TYPES.NONE,
    time: 3000,
  });

  useEffect(() => {
    if (codeurl) {
      getPasswordCode(codeurl);
    }
    async function getPasswordCode(codeurl: string) {
      try {
        const res = (await AuthServices.getforgotpasswordcode({ codeurl })) as {
          code: string;
        };
        setLoading(false);
        setValue("code", res.code);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setCodeurl("");
        setShowAlert({
          show: true,
          message: "Não foi possível recuperar o código, verifique seu email.",
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
        setLoading(false);
      }
    }
  }, [history, setValue, codeurl]);

  function showInfo(state: State) {
    const dia = state.date.split(" ")[0];
    const dateSplit = state.date.split(" ")[1];
    const horas = `${dateSplit.split(":")[0]}:${dateSplit.split(":")[1]}`;

    return (
      <div
        className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 mt-3 shadow-md"
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
            <p className="py-1">
              Veja o email <span className="font-bold">{state.email}</span> e
              preencha o código.
            </p>
            <p className="py-1">
              Válido até às <span className="font-bold">{horas}hs</span> de{" "}
              <span className="font-bold">{dia}</span>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = async (form: Form) => {
    setLoading(true);
    setState({ ...state, email: "" });
    if (form.newpassword !== form.repeatnewpassword) {
      setShowAlert({
        show: true,
        message: "Senhas são diferentes!",
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
      return;
    }
    try {
      await AuthServices.changepassword({
        codeNumber: form.code,
        password: form.newpassword,
      });
      setLoading(false);
      history.push(authRoutes.signIn, { changePassword: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <main className="bg-white max-w-lg mx-auto p-4 md:p-6 my-10 rounded-lg shadow-2xl">
      <Title title="Mudar Senha" />
      {state?.email && showInfo(state)}
      {showAlert.show && <Alert alert={showAlert} setAlert={setShowAlert} />}
      <section className="mt-5">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="code"
            >
              Código
            </label>
            <input
              type="text"
              id="code"
              disabled={!!codeurl}
              {...register("code", { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 pb-1 ` +
                (errors.code ? `border-red-600 ` : `focus:border-primary-600`)
              }
            />
          </div>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="newpassword"
            >
              Nova Senha
            </label>
            <input
              type="password"
              id="newpassword"
              {...register("newpassword", { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 pb-1 ` +
                (errors.newpassword
                  ? `border-red-600 `
                  : `focus:border-primary-600`)
              }
            />
          </div>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="repeatnewpassword"
            >
              Repita Nova Senha
            </label>
            <input
              type="password"
              id="repeatnewpassword"
              {...register("repeatnewpassword", { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-2 pb-1 ` +
                (errors.repeatnewpassword
                  ? `border-red-600 `
                  : `focus:border-primary-600`)
              }
            />
          </div>
          <Link link={authRoutes.signIn} text="Voltar para Entrar" />
          <LoadingButton
            styles="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
            text="Alterar Senha"
            loading={loading}
          />
        </form>
      </section>
    </main>
  );
}

export default ChangePassword;
