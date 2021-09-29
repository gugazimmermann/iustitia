import { api, PeopleServices, token } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { SiteRoutes } from "@iustitia/react-routes";
import { ProfileInterface } from "./profile";

export const OfficeModule = {
  module: "office",
  parents: [],
  singular: "Escritório",
  plural: "Escritórios",
  route: SiteRoutes.Offices,
};

export interface OfficeInterface {
  id?: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  active: boolean;
  managersOffice?: ProfileInterface[];
  usersOffice?: ProfileInterface[];
  tenantId?: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
};

type ModuleInterface = OfficeInterface;
const RouteName = OfficeModule.module;

export async function count(): Promise<number | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/count/${tenantId}`);
    return data.offices;
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAll(): Promise<OfficeInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getOne(id: string): Promise<OfficeInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(formData: ModuleInterface): Promise<OfficeInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${RouteName}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function active({ active, officeId }: { active: boolean, officeId: string }): Promise<OfficeInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${RouteName}/active/${tenantId}`, { active, officeId });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function managers(officeId: string, managersList: PeopleServices.SimpleUserInterface[]): Promise<OfficeInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${RouteName}/managers/${tenantId}`, { officeId, managersList });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function users(officeId: string, usersList: PeopleServices.SimpleUserInterface[]): Promise<OfficeInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${RouteName}/users/${tenantId}`, { officeId, usersList });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(formData: ModuleInterface): Promise<OfficeInterface | Error> {
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
