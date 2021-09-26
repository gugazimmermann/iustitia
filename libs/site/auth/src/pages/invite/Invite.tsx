import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { Alert, LoadingButton } from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { PeopleServices } from "@iustitia/site/services";
import { Title } from "../..";

type Form = {
  code: string;
  newpassword: string;
  repeatnewpassword: string;
};

interface useParamsProps {
  tenantId: string;
  code: string;
}

export function Invite() {
  const history = useHistory();
  const { tenantId, code } = useParams<useParamsProps>();
  const [codeUrl, setCodeUrl] = useState(code);
  const [tenantIdUrl, setTenantIdUrl] = useState(tenantId);
  const [invite, setInvite] = useState<PeopleServices.PeopleInterface>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Form>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (codeUrl && tenantIdUrl) {
      getCode(tenantIdUrl, codeUrl);
    }
  }, [codeUrl, tenantIdUrl]);

  useEffect(() => {
    if (invite?.code) {
      setValue("code", invite.code)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invite]);

  async function getCode(tenantIdUrl: string, codeUrl: string) {
    try {
      const data = (await PeopleServices.getInviteCode(tenantIdUrl, codeUrl)) as PeopleServices.PeopleInterface;
      setInvite(data);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("Não foi possível recuperar o código, verifique seu email.");
      setLoading(false);
    }
  }

  const onSubmit = async (form: Form) => {
    setLoading(true);
    setError("");
    if (form.newpassword !== form.repeatnewpassword) {
      setError("Senhas são diferentes!");
      setLoading(false);
      return;
    }
    try {
      await PeopleServices.createUser(tenantIdUrl, form.code, form.newpassword);
      setLoading(false);
      history.push(Routes.SignIn, { inviteaccepted: true, email: invite?.email });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message as string);
      setLoading(false);
    }
  };

  return (
    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      <Title title="Convite" />
      {error && <Alert type={WARNING_TYPES.ERROR} message={error} />}
      <section className="mt-5">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="code"
            >
              Código
            </label>
            <input
              type="text"
              id="code"
              disabled={!!codeUrl}
              {...register("code", { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-3 pb-3 ` +
                (errors.code ? `border-red-600 ` : `focus:border-primary-600`)
              }
            />
          </div>
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="newpassword"
            >
              Cadastre sua Senha
            </label>
            <input
              type="password"
              id="newpassword"
              {...register("newpassword", { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-3 pb-3 ` +
                (errors.newpassword
                  ? `border-red-600 `
                  : `focus:border-primary-600`)
              }
            />
          </div>
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="repeatnewpassword"
            >
              Repita a Senha
            </label>
            <input
              type="password"
              id="repeatnewpassword"
              {...register("repeatnewpassword", { required: true })}
              className={
                `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-3 pb-3 ` +
                (errors.repeatnewpassword
                  ? `border-red-600 `
                  : `focus:border-primary-600`)
              }
            />
          </div>
          <LoadingButton
            styles="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
            text="Aceitar Convite"
            loading={loading}
          />
        </form>
      </section>
    </main>
  );
}

export default Invite;
