
import { GetComponent, ComponentsEnum } from "@iustitia/components";
import { PlanInterface, SubscriptionInterface, PaymentInterface, CreditCardInterface } from "@iustitia/interfaces";
import { errorHandler } from "@iustitia/site/shared-utils";
import { api } from "../..";

const component = GetComponent(ComponentsEnum.subscriptions);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.subscriptions}`)

export async function getPlans(): Promise<PlanInterface[] | Error> {
  try {
    const { data } = await api.get(`/api/${component}/plans`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getSubscription(): Promise<SubscriptionInterface | Error> {
  try {
    const { data } = await api.get(`/api/${component}/subscription`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getPayments(): Promise<PaymentInterface[] | Error> {
  try {
    const { data } = await api.get(`/api/${component}/payments`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getCreditcards(): Promise<CreditCardInterface[] | Error> {
  try {
    const { data } = await api.get(`/api/${component}/creditcards`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
