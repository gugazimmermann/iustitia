import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Alert,
  AlertInterface,
  LoadingButton,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { MembersServices } from "@iustitia/site/services";
import { GetRoutes, ModulesEnum, AuthRoutesInterface } from "@iustitia/modules";
import { Title } from "../../components";

type MembersType = MembersServices.MembersRes;

const authRoutes = GetRoutes(ModulesEnum.auth) as AuthRoutesInterface;

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
  const [invite, setInvite] = useState<MembersType>();

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
    if (codeUrl && tenantIdUrl) {
      getCode(tenantIdUrl, codeUrl);
    }
  }, [codeUrl, tenantIdUrl]);

  useEffect(() => {
    if (invite?.code) {
      setValue("code", invite.code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invite]);

  async function getCode(tenantIdUrl: string, codeUrl: string) {
    try {
      const data = (await MembersServices.getInviteCode({
        tenantId: tenantIdUrl,
        code: codeUrl,
      })) as MembersType;
      setInvite(data);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: "N??o foi poss??vel recuperar o c??digo, verifique seu email.",
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
    }
  }

  const onSubmit = async (form: Form) => {
    setLoading(true);
    if (form.newpassword !== form.repeatnewpassword) {
      setShowAlert({
        show: true,
        message: "Senhas s??o diferentes!",
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
      return;
    }
    try {
      await MembersServices.create({
        tenantId: tenantIdUrl,
        code: form.code,
        password: form.newpassword,
      });
      setLoading(false);
      history.push(authRoutes.signIn, {
        inviteaccepted: true,
        email: invite?.email,
      });
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
      <Title title="Convite" />
      {showAlert.show && <Alert alert={showAlert} setAlert={setShowAlert} />}
      <section className="mt-5">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 ml-2"
              htmlFor="code"
            >
              C??digo
            </label>
            <input
              type="text"
              id="code"
              disabled={!!codeUrl}
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
              Cadastre sua Senha
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
              Repita a Senha
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
