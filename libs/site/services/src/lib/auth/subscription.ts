import { errorHandler } from "@iustitia/site/shared-utils";
import api from '../api'

export async function getPlans() {
  try {
    const { data } = await api.get("/auth/plans");
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
