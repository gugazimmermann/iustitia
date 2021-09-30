import {
  GetModule,
  ScheduleEventInterface,
  ScheduleFormDataEventInterface,
  ScheduleGetAllEventsInterface,
  SiteModulesEnum
} from "@iustitia/site-modules";
import { errorHandler } from "@iustitia/site/shared-utils";
import { ApiIdInterface, ApiMessageInterface } from "../interfaces";
import { api, token } from "../.."

const sitemodule = GetModule(SiteModulesEnum.schedule);
if (!undefined) throw new Error("Module not Found!")

export async function getOneEvent(
  { id }: ApiIdInterface
): Promise<ScheduleEventInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/calendar/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAllEvents(
  { officeId }: ScheduleGetAllEventsInterface
): Promise<ScheduleEventInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const url = !officeId ? `/api/${sitemodule.name}/calendar/${tenantId}` : `/api/${sitemodule.name}/calendar/${tenantId}/office/${officeId}`;
    await api.get(url);
    const { data } = await api.get(url);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createEvent(
  { formData }: ScheduleFormDataEventInterface
): Promise<ScheduleEventInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${sitemodule.name}/calendar`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(
  { formData }: ScheduleFormDataEventInterface
): Promise<ScheduleEventInterface | Error> {
  try {
    const { data } = await api.put(`/api/${sitemodule.name}/calendar`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOne(
  { id }: ApiIdInterface
): Promise<ApiMessageInterface | Error> {
  try {
    return await api.delete(`/api/${sitemodule.name}/calendar/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
