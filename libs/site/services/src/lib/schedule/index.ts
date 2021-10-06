import { ModulesEnum } from "@iustitia/modules";
import { EventsInterface } from "@iustitia/api/schedule";
import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";
import token from "../auth/token";
import { ApiIdReq, ApiMessageRes } from "../interfaces";

export type ScheduleEventsRes = EventsInterface;

export interface ScheduleEventsGetAllReq {
  placeId?: string;
}

export interface ScheduleEventsFormDataReq {
  formData: ScheduleEventsRes
}

export async function getOneEvent({ id }: ApiIdReq): Promise<ScheduleEventsRes | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.schedule}/events/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAllEvents({ placeId }: ScheduleEventsGetAllReq): Promise<ScheduleEventsRes[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const url = !placeId ? `/api/${ModulesEnum.schedule}/events/${tenantId}` : `/api/${ModulesEnum.schedule}/events/${tenantId}/place/${placeId}`;
    await api.get(url);
    const { data } = await api.get(url);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createEvent({ formData }: ScheduleEventsFormDataReq): Promise<ScheduleEventsRes | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${ModulesEnum.schedule}/events`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function updateEvent({ formData }: ScheduleEventsFormDataReq): Promise<ScheduleEventsRes | Error> {
  try {
    const { data } = await api.put(`/api/${ModulesEnum.schedule}/events`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOneEvent({ id }: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    return await api.delete(`/api/${ModulesEnum.schedule}/events/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
