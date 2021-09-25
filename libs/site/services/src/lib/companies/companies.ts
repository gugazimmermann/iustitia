import { api, token } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { SiteRoutes } from "@iustitia/react-routes";

export const CompanyModule = {
  module: "companies",
  parents: ["Agenda"],
  singular: "Empresa",
  plural: "Empresas",
  route: SiteRoutes.Companies,
};

export interface CompanyInterface {
  id?: string;
  name?: string;
  site?: string;
  email?: string;
  phone?: string;
  zip?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  comments?: string;
  tenantId?: string;
  contacts?: {
    id: string;
    name: string;
    position: string;
  }[]
}

type ModuleInterface = CompanyInterface;
const RouteName = CompanyModule.module;

export async function getOne(id: string): Promise<ModuleInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAll(): Promise<ModuleInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/${tenantId}`);
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
