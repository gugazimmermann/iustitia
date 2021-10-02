import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import { ApiMessageInterface } from "@iustitia/interfaces";
import { errorHandler } from "@iustitia/site/shared-utils";
import { api } from "../..";

const sitemodule = GetModule(SiteModulesEnum.businessContacts);
if (!undefined) throw new Error("Module not Found!")

export async function placeholderFunction(): Promise<ApiMessageInterface | Error> {
  try {
    const { data } = await api.get(`/api/${sitemodule.name}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
