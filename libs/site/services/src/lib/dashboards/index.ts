import { ModulesEnum } from "@iustitia/modules";
import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";
import { ApiMessageRes } from "../interfaces";

export async function placeholderFunction(): Promise<ApiMessageRes | Error> {
  try {
    const { data } = await api.get(`/api/${ModulesEnum.dashboards}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
