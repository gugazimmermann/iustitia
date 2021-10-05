
import { ModulesEnum } from "@iustitia/modules";
import {SubscriptionInterface} from "@iustitia/api/subscriptions";
import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";

export type SubscriptionRes = SubscriptionInterface

export interface PlanRes {
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

export interface PaymentRes {
  id?: string;
  userId?: string;
  transactionAmount: number;
  status: string;
  paidDate: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface CreditCardRes {
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

export async function getPlans(): Promise<PlanRes[] | Error> {
  try {
    const { data } = await api.get(`/api/${ModulesEnum.subscriptions}/plans`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getSubscription(): Promise<SubscriptionRes | Error> {
  try {
    const { data } = await api.get(`/api/${ModulesEnum.subscriptions}/subscription`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getPayments(): Promise<PaymentRes[] | Error> {
  try {
    const { data } = await api.get(`/api/${ModulesEnum.subscriptions}/payments`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getCreditcards(): Promise<CreditCardRes[] | Error> {
  try {
    const { data } = await api.get(`/api/${ModulesEnum.subscriptions}/creditcards`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
