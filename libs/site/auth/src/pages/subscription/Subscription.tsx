import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Alert, ALERT_TYPES, PlanBasic, PlanProfessional } from "@iustitia/site/shared-components";
import { getPlans } from "../../services/subscription";
import { MercadoPago } from "./protocols";
import { BasicFeatures, ProfessionalFeatures } from "./features";

interface Constructable<T> {
  new (key: string, options?: { locale: string }): T;
}

declare global {
  interface Window {
    MercadoPago: Constructable<MercadoPago>;
  }
}

interface State {
  email: string;
  planId: string;
}

interface IPlan {
  id: string;
  reason: string;
  transactionAmount: number;
  currencyId: string;
}

const PUBLIC_KEY =
  process.env.NX_STAGE === "dev"
    ? process.env.NX_MERCADOPAGO_PUBLIC_KEY_TEST
    : process.env.NX_MERCADOPAGO_PUBLIC_KEY;

export function Subscription() {
  const location = useLocation();
  const { email, planId } = location.state as State;
  const [plans, setPlans] = useState<IPlan[]>();
  const [plan, setPlan] = useState<IPlan>();
  const [error, setError] = useState("");

  useEffect(() => {
    async function seePlan() {
      try {
        const data: IPlan[] = await getPlans();
        setPlans(data);
        const userPlan = data.filter((p) => p.id === planId)[0];
        setPlan(userPlan);
        if (userPlan) {
          const mp = new window.MercadoPago(PUBLIC_KEY as string, {
            locale: "pt-BR",
          });
          mp.checkout({
            tokenizer: {
              totalAmount: userPlan.transactionAmount,
              backUrl: `${process.env.NX_APP_SITE}/confirmacao-assinatura`,
              summary: {
                productLabel: userPlan.reason,
                product: userPlan.transactionAmount
              },
              installments: {
                minInstallments: 1,
                maxInstallments: 1,
            },
            },
            render: {
              container: ".tokenizer-container",
              type: "wallet",
              label: "Assinar",
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    seePlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      {error && <Alert type={ALERT_TYPES.ERROR} message={error} />}
      <section>
        <div className="max-w-xl mb-4 md:mb-6 md:mx-auto sm:text-center lg:max-w-2xl ">
          <h2 className="max-w-lg mb-2 font-sans text-3xl font-bold leading-none tracking-tight text-gray-700 sm:text-4xl md:mx-auto">
            Assinatura
          </h2>
        </div>
        <div className="grid max-w-md lg:max-w-screen-md sm:mx-auto">
          <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between pb-6 mb-6 border-b">
                <div>
                  <p className="text-sm font-bold tracking-wider uppercase">
                    {plan?.reason}
                  </p>
                  <p className="text-3xl font-extrabold text-primary-700">
                    {plan?.transactionAmount.toLocaleString("pt-br", {
                      style: "currency",
                      currency: plan?.currencyId,
                    })}{" "}
                    /{" "}
                    <span className="text-xl">
                      {plan?.reason.toLowerCase().includes("mensal")
                        ? `mês`
                        : plan?.reason.toLowerCase().includes("semestral")
                        ? `semestre`
                        : `ano`}
                    </span>
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center justify-center w-24 h-24 rounded-full bg-primary-100">
                  {plan?.reason.toLowerCase().includes("profissional") ? (
                    <PlanProfessional styles="w-12 h-12 text-primary-700" />
                  ) : (
                    <PlanBasic styles="w-12 h-12 text-primary-700" />
                  )}
                </div>
              </div>
              <div>
                <div className="w-full text-center">
                  <p className="mb-2 font-bold tracking-wide">
                    Características
                  </p>
                </div>
                {plan?.reason.toLowerCase().includes("profissional") ? (
                  <ProfessionalFeatures />
                ) : (
                  <BasicFeatures />
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center justify-center text-center">
                <div className="tokenizer-container"></div>
                <p className="mt-4 text-sm text-gray-600">
                  O plano pode ser alterado posteriormente para Profissional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Subscription;
