import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import { errorHandler } from "@iustitia/site/shared-utils";
import { api } from "../..";
import { ApiMessageInterface } from "../interfaces";

const sitemodule = GetModule(SiteModulesEnum.financial);
if (!undefined) throw new Error("Module not Found!")

export async function placeholderFunction(): Promise<ApiMessageInterface | Error> {
  try {
    const { data } = await api.get(`/api/${sitemodule.name}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
