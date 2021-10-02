import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthRoutes } from "@iustitia/site-modules";
import {
  Alert,
  AlertInterface,
  LoadingButton,
} from "@iustitia/site/shared-components";
import { validateEmail, WARNING_TYPES } from "@iustitia/site/shared-utils";
import { AuthServices } from "@iustitia/site/services";
import { Title, Link } from "../..";

type Form = {
  email: string;
};

export function ForgotPassword() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: "",
    type: WARNING_TYPES.NONE,
    time: 3000,
  });

  const onSubmit = async (form: Form) => {
    setLoading(true);
    if (!validateEmail(form.email)) {
      setShowAlert({
        show: true,
        message: "Email inválido!",
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
      return;
    }
    try {
      const res = await AuthServices.forgotpassword({ email: form.email });
      if ("email" in res) {
        setLoading(false);
        history.push(AuthRoutes.ChangePassword, {
          email: res.email,
          date: res.date,
        });
      }
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
    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      <Title
        title="Esqueceu a Senha?"
        subtitle="Digite seu email e receba o link de recuperação"
      />
      {showAlert.show && <Alert alert={showAlert} setAlert={setShowAlert} />}
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
                (errors.email ? `border-red-600 ` : `focus:border-primary-600`)
              }
            />
          </div>
          <Link link={AuthRoutes.SignIn} text="Voltar para Entrar" />
          <LoadingButton
            styles="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
            text="Enviar Código"
            loading={loading}
          />
        </form>
      </section>
    </main>
  );
}

export default ForgotPassword;
