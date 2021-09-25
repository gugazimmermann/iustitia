import { api, token } from "../.."
import { errorHandler } from "@iustitia/site/shared-utils";
import { SiteRoutes } from "@iustitia/react-routes";

export const CalendarModule = {
  module: "calendar",
  parents: ["Agenda"],
  singular: "Calendário",
  route: SiteRoutes.Calendar,
};

export interface CalendarInterface {
  id: string;
  startDate: Date;
  endDate: Date;
  fullDay: boolean;
  color: string;
  title: string;
  description: string;
  tenantId: string;
}

type ModuleInterface = CalendarInterface;
const RouteName = CalendarModule.module;

export async function getOne(id: string): Promise<ModuleInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAll(officeId?: string): Promise<ModuleInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const url = !officeId ? `/api/${RouteName}/${tenantId}` : `/api/${RouteName}/${tenantId}/office/${officeId}`;
    await api.get(url);
    const { data } = await api.get(url);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(formData: ModuleInterface): Promise<ModuleInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${RouteName}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(formData: ModuleInterface): Promise<ModuleInterface | Error> {
  try {
    const { data } = await api.put(`/api/${RouteName}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOne(id: string): Promise<{ message: string } | Error> {
  try {
    return await api.delete(`/api/${RouteName}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
