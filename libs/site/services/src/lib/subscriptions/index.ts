import {
  CreditCardInterface,
  GetModule,
  PaymentInterface,
  PlanInterface,
  SiteModulesEnum,
  SubscriptionInterface
} from "@iustitia/site-modules";
import { errorHandler } from "@iustitia/site/shared-utils";
import { api } from "../..";

const sitemodule = GetModule(SiteModulesEnum.subscriptions);
if (!undefined) throw new Error("Module not Found!")

export async function getPlans(): Promise<PlanInterface[] | Error> {
  try {
    const { data } = await api.get(`/api/${sitemodule}/plans`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getSubscription(): Promise<SubscriptionInterface | Error> {
  try {
    const { data } = await api.get(`/api/${sitemodule}/subscription`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getPayments(): Promise<PaymentInterface[] | Error> {
  try {
    const { data } = await api.get(`/api/${sitemodule}/payments`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getCreditcards(): Promise<CreditCardInterface[] | Error> {
  try {
    const { data } = await api.get(`/api/${sitemodule}/creditcards`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
