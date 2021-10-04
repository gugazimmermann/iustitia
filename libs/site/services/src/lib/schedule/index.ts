import { errorHandler } from "@iustitia/site/shared-utils";
import { ApiIdInterface, ApiMessageInterface, ScheduleEventsInterface, ScheduleEventsGetAllInterface, ScheduleEventsFormDataInterface } from "@iustitia/interfaces";
import { api, token } from "../.."
import { GetComponent, ComponentsEnum } from "@iustitia/components";

const component = GetComponent(ComponentsEnum.schedule);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.schedule}`)

export async function getOneEvent(
  { id }: ApiIdInterface
): Promise<ScheduleEventsInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${component?.name}/events/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAllEvents(
  { officeId }: ScheduleEventsGetAllInterface
): Promise<ScheduleEventsInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const url = !officeId ? `/api/${component?.name}/events/${tenantId}` : `/api/${component?.name}/events/${tenantId}/office/${officeId}`;
    await api.get(url);
    const { data } = await api.get(url);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createEvent(
  { formData }: ScheduleEventsFormDataInterface
): Promise<ScheduleEventsInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${component?.name}/events`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function updateEvent(
  { formData }: ScheduleEventsFormDataInterface
): Promise<ScheduleEventsInterface | Error> {
  try {
    const { data } = await api.put(`/api/${component?.name}/events`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOneEvent(
  { id }: ApiIdInterface
): Promise<ApiMessageInterface | Error> {
  try {
    return await api.delete(`/api/${component?.name}/events/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
