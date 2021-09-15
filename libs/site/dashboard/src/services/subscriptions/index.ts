import { api } from "@iustitia/site/auth";
import { errorHandler } from "@iustitia/site/shared-utils";

export async function getPlans() {
  try {
    const { data } = await api.get(`/api/plans`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getSubscription() {
  try {
    const { data } = await api.get(`/api/subscription`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getPayments() {
  try {
    const { data } = await api.get(`/api/payments`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getCreditcards() {
  try {
    const { data } = await api.get(`/api/creditcards`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
