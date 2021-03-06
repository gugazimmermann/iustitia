import { useEffect, useState } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Alert,
  AlertInterface,
  LoadingButton,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { AuthServices, SubscriptionsServices } from "@iustitia/site/services";
import { GetRoutes, ModulesEnum, AuthRoutesInterface } from "@iustitia/modules";
import {
  CardToken,
  CreateCardToken,
  Identification,
  MercadoPago,
} from "./protocols";
import { SignUpForm } from "..";
import { Title } from "../../components";

type PlanType = SubscriptionsServices.PlanRes;

const authRoutes = GetRoutes(ModulesEnum.auth) as AuthRoutesInterface;

export interface SubscriptionForm {
  name: string;
  cardNumber: string;
  cardExpiration: string;
  securityCode: string;
  documentType: string;
  document: string;
}

const PUBLIC_KEY =
  process.env.NX_STAGE === "dev"
    ? process.env.NX_MERCADOPAGO_PUBLIC_KEY_TEST
    : process.env.NX_MERCADOPAGO_PUBLIC_KEY;
interface Constructable<T> {
  new (key: string, options?: { locale: string }): T;
}

declare global {
  interface Window {
    MercadoPago: Constructable<MercadoPago>;
  }
}

interface State {
  form: SignUpForm;
  plan: PlanType;
}

export function Subscription() {
  const history = useHistory();
  const location = useLocation();
  const state = location?.state as State;
  const form = state?.form;
  const plan = state?.plan;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionForm>();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: "",
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const [mercadoPago, setMercadoPago] = useState<MercadoPago>();
  const [identificationTypes, setIdentificationTypes] =
    useState<Identification[]>();
  const [cardImg, setCardImg] = useState("");

  useEffect(() => {
    async function getIdentificationTypes(mp: MercadoPago) {
      const res = await mp.getIdentificationTypes();
      setIdentificationTypes(res);
    }
    const mp = new window.MercadoPago(PUBLIC_KEY as string, {
      locale: "pt-BR",
    });
    setMercadoPago(mp);
    getIdentificationTypes(mp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getCardThumbnail(card: string) {
    if (card && mercadoPago) {
      const bin = card.replace(/\D/g, "").substring(0, 6);
      if (bin && bin.length === 6) {
        const paymentMethods = await mercadoPago.getPaymentMethods({ bin });
        if (paymentMethods.results.length > 0) {
          setCardImg(paymentMethods.results[0].thumbnail);
        } else {
          setCardImg("");
        }
      }
    }
  }

  async function getCardToken(data: CreateCardToken) {
    if (mercadoPago) {
      try {
        return await mercadoPago.createCardToken({
          cardNumber: data.cardNumber,
          cardholderName: data.cardholderName,
          cardExpirationMonth: data.cardExpirationMonth,
          cardExpirationYear: data.cardExpirationYear,
          securityCode: data.securityCode,
          identificationType: data.identificationType,
          identificationNumber: data.identificationNumber,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  const onSubmit = async (data: SubscriptionForm) => {
    setLoading(true);
    try {
      const token: CardToken = await getCardToken({
        cardNumber: data.cardNumber.replace(/\D/g, ""),
        cardholderName: data.name,
        cardExpirationMonth: data.cardExpiration.split("/")[0],
        cardExpirationYear: `20${data.cardExpiration.split("/")[1]}`,
        securityCode: data.securityCode,
        identificationType: data.documentType,
        identificationNumber: data.document,
      });
      await AuthServices.signup({
        name: form.name,
        email: form.email,
        password: form.password,
        planId: plan.id as string,
        cardInfo: {
          id: token.id,
          name: token.cardholder.name,
          expirationMonth: token.expiration_month,
          expirationYear: token.expiration_year,
          firstSixDigits: token.first_six_digits,
          lastFourDigits: token.last_four_digits,
        },
      });
      setLoading(false);
      history.push(authRoutes.signIn, { email: form.email });
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

  if (form === undefined || plan === undefined) {
    return <Redirect to={authRoutes.signUp} />;
  } else {
    return (
      <main className="bg-white max-w-lg mx-auto p-4 md:p-6 my-10 rounded-lg shadow-2xl">
        <Title title="Pagamento da Assinatura" />
        {showAlert.show && <Alert alert={showAlert} setAlert={setShowAlert} />}
        <section>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <p className="text-base font-bold uppercase text-center">
              {plan?.reason}
            </p>
            <p className="text-xl font-bold text-primary-700">
              {(plan?.transactionAmount as number).toLocaleString("pt-br", {
                style: "currency",
                currency: plan?.currencyId,
              })}{" "}
              /{" "}
              <span className="text-xl">
                {(plan?.reason as string).toLowerCase().includes("mensal")
                  ? `m??s`
                  : (plan?.reason as string).toLowerCase().includes("semestral")
                  ? `semestre`
                  : `ano`}
              </span>
            </p>
          </div>
          <form
            id="form-checkout"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-2 rounded">
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor="name"
              >
                Titular do cart??o
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
                className={
                  `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-1 pb-1 ` +
                  (errors.name ? `border-red-600 ` : `focus:border-primary-600`)
                }
              />
            </div>
            <div className="flex items-center justify-center space-x-4 mb-2 rounded">
              <div className="flex-1">
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="cardNumber"
                >
                  N??mero do Cart??o
                </label>
                <input
                  type="text"
                  id="number"
                  {...register("cardNumber", { required: true })}
                  onBlur={(e) => getCardThumbnail(e.target.value)}
                  className={
                    `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-1 pb-1 ` +
                    (errors.cardNumber
                      ? `border-red-600 `
                      : `focus:border-primary-600`)
                  }
                />
              </div>
              <div className="flex-0">
                {cardImg !== "" && <img src={cardImg} alt="card banner" />}
              </div>
            </div>
            <div className="mb-2 rounded">
              <div className="flex space-x-6">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="cardExpiration"
                  >
                    Vencimento
                  </label>
                  <input
                    type="text"
                    id="cardExpiration"
                    {...register("cardExpiration", { required: true })}
                    className={
                      `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-1 pb-1 ` +
                      (errors.cardExpiration
                        ? `border-red-600 `
                        : `focus:border-primary-600`)
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="securityCode"
                  >
                    <span className="inline-flex md:hidden">
                      C??d. de Seguran??a
                    </span>
                    <span className="hidden md:inline-flex">
                      C??digo de Seguran??a
                    </span>
                  </label>
                  <input
                    type="text"
                    id="securityCode"
                    {...register("securityCode", { required: true })}
                    className={
                      `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-1 pb-1 ` +
                      (errors.securityCode
                        ? `border-red-600 `
                        : `focus:border-primary-600`)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 rounded">
              <div className="flex space-x-6">
                <div className="flex-0">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="documentType"
                  >
                    <span className="inline-flex md:hidden">Documento</span>
                    <span className="hidden md:inline-flex">
                      Tipo de Documento
                    </span>
                  </label>
                  <select
                    id="documentType"
                    {...register("documentType", { required: true })}
                    className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-1 pb-1 focus:border-primary-600"
                  >
                    {identificationTypes &&
                      identificationTypes.length > 0 &&
                      identificationTypes.map((type, i) => (
                        <option key={i} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="document"
                  >
                    N??mero do Documento
                  </label>
                  <input
                    type="text"
                    id="document"
                    {...register("document", { required: true })}
                    className={
                      `bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-1 pb-1 ` +
                      (errors.document
                        ? `border-red-600 `
                        : `focus:border-primary-600`)
                    }
                  />
                </div>
              </div>
            </div>
            <LoadingButton
              styles="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
              text="Avan??ar"
              loading={loading}
            />
          </form>
        </section>
        {process.env.NX_STAGE === "dev" && (
          <div className="mt-6 text-gray-400">
            Titular: APRO
            <br />
            Mastercard | 5031 4332 1540 6351 | 11/25 | 123
            <br />
            Visa | 4235 6477 2802 5682 | 11/25 | 123
          </div>
        )}
      </main>
    );
  }
}

export default Subscription;
