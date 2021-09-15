import { useEffect, useState } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import {
  PlanBasicIcon,
  PlanProfessionalIcon,
} from "@iustitia/site/shared-components";
import { getPlans } from "../../services/subscription";
import { BasicFeatures, ProfessionalFeatures } from "./features";
import { SignUpForm } from "../..";
import { signup } from "../../services/auth";

export interface PlanInterface {
  id: string;
  reason: string;
  transactionAmount: number;
  currencyId: string;
}

interface State {
  form: SignUpForm;
}

export function Plan() {
  const history = useHistory();
  const location = useLocation();
  const state = location?.state as State;
  const form = state?.form;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [plans, setPlans] = useState<PlanInterface[]>([]);
  const [plan, setPlan] = useState<PlanInterface>();
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    async function Plans() {
      try {
        const data: PlanInterface[] = await getPlans();
        const freePlan = data.find((p) => p.transactionAmount === 0);
        setSelectedPlan(freePlan?.id || "");
        setPlan(freePlan);
        setPlans(data);
      } catch (err) {
        console.log(err);
      }
    }

    Plans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelectPlan(id: string) {
    setSelectedPlan(id);
    const userPlan = plans.find((p) => p.id === id);
    if (userPlan) setPlan(userPlan);
  }

  function planIcon(p: PlanInterface | undefined) {
    if (
      p?.reason.toLowerCase().includes("profissional") ||
      p?.reason.toLowerCase().includes("gratuito")
    ) {
      return <PlanProfessionalIcon styles="w-12 h-12 text-primary-700" />;
    } else {
      return <PlanBasicIcon styles="w-12 h-12 text-primary-700" />;
    }
  }

  function planFeatures(p: PlanInterface | undefined) {
    if (
      p?.reason.toLowerCase().includes("profissional") ||
      p?.reason.toLowerCase().includes("gratuito")
    ) {
      return <ProfessionalFeatures />;
    } else {
      return <BasicFeatures />;
    }
  }

  function planMsg(p: PlanInterface | undefined) {
    if (
      !p?.reason.toLowerCase().includes("profissional") &&
      !p?.reason.toLowerCase().includes("gratuito")
    ) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="mt-4 text-sm text-gray-600">
            O plano pode ser alterado posteriormente para Profissional.
          </p>
        </div>
      );
    } else if (p?.reason.toLowerCase().includes("gratuito")) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="mt-4 text-sm font-bold text-red-600">
            Período de testes de 15 dias!
          </p>
          <p className="mt-2 text-sm text-gray-600">
            O plano pode ser alterado posteriormente para Básico ou
            Profissional.
          </p>
        </div>
      );
    } else {
      return null;
    }
  }

  async function handleFoward() {
    setLoading(true);
    if (plan?.transactionAmount !== 0) {
      setLoading(false);
      history.push(Routes.Subscription, { form, plan: plan });
    } else {
      try {
        await signup({
          name: form.name,
          email: form.email,
          password: form.password,
          planId: plan.id,
        });
        setLoading(false);
        history.push(Routes.SignIn, { email: form.email });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message as string);
        setLoading(false);
      }
    }
  }

  if (form === undefined) {
    return <Redirect to={Routes.SignUp} />;
  } else {
    return (
      <main className="bg-white max-w-lg mx-auto p-6 py-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <div className="mb-4 md:mb-6 md:mx-auto text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-700">
              Selecione seu Plano
            </h1>
          </div>
          <form className="flex flex-col">
            <div className="mb-6 rounded">
              <select
                id="plan"
                value={selectedPlan || ""}
                onChange={(e) => handleSelectPlan(e.target.value)}
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 transition duration-500 px-3 pb-3"
              >
                {plans &&
                  plans.length &&
                  plans.map((p, i) => (
                    <option key={i} value={p.id}>
                      {p.reason} -{" "}
                      {p.transactionAmount.toLocaleString("pt-br", {
                        style: "currency",
                        currency: p.currencyId,
                      })}
                    </option>
                  ))}
              </select>
            </div>
          </form>
          <div className="grid mx-auto">
            <div className="flex flex-col justify-between p-4 bg-white border rounded shadow-sm">
              <div className="mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between pb-6 mb-6 border-b">
                  <div>
                    <p className="text-sm font-bold uppercase text-center">
                      {plan?.reason}
                    </p>
                    <p className="text-3xl font-bold text-primary-700">
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
                    {planIcon(plan)}
                  </div>
                </div>
                <div>
                  <div className="w-full text-center">
                    <p className="mb-2 font-bold tracking-wide">
                      Características
                    </p>
                  </div>
                  {planFeatures(plan)}
                </div>
              </div>
              <div>{planMsg(plan)}</div>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <button
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="button"
              onClick={() => handleFoward()}
            >
              Avançar
            </button>
          </div>
        </section>
      </main>
    );
  }
}

export default Plan;