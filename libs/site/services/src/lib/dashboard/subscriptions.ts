import { api } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { SiteRoutes } from "@iustitia/react-routes";

export const SubscriptionModule = {
  module: "subscription",
  parents: [],
  singular: "Assinatura",
  plural: "Assinaturas",
  route: SiteRoutes.Subscription,
};

export interface PlanInterface {
  id?: string;
  preapprovalPlanId?: string;
  collectorId?: number;
  applicationId?: number;
  reason?: string;
  status?: string;
  initPoint?: string;
  frequency?: number;
  frequencyType?: string;
  transactionAmount?: number;
  currencyId?: string;
  type?: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface SubscriptionInterface {
  id?: string;
  userId?: string;
  planId: string;
  reason: string;
  frequency: number;
  frequencyType: string;
  transactionAmount: number;
  status: boolean;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface PaymentInterface {
  id?: string;
  userId?: string;
  transactionAmount: number;
  status: string;
  paidDate: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface CreditCardInterface {
  id?: string;
  userId?: string;
  name: string;
  firstSixDigits: string;
  lastFourDigits: string;
  expirationMonth: string;
  expirationYear: string;
  status: boolean;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export async function getPlans(): Promise<PlanInterface[] | Error> {
  try {
    const { data } = await api.get(`/api/plans`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getSubscription(): Promise<SubscriptionInterface | Error> {
  try {
    const { data } = await api.get(`/api/subscription`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getPayments(): Promise<PaymentInterface[] | Error> {
  try {
    const { data } = await api.get(`/api/payments`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getCreditcards(): Promise<CreditCardInterface[] | Error> {
  try {
    const { data } = await api.get(`/api/creditcards`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
