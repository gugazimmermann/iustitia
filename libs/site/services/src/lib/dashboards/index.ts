import { GetComponent, ComponentsEnum } from "@iustitia/components";
import { ApiMessageInterface } from "@iustitia/interfaces";
import { errorHandler } from "@iustitia/site/shared-utils";
import { api } from "../..";

const component = GetComponent(ComponentsEnum.dashboards);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.dashboards}`)

export async function placeholderFunction(): Promise<ApiMessageInterface | Error> {
  try {
    const { data } = await api.get(`/api/${component?.name}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
