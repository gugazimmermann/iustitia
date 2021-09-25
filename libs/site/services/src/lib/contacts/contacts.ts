import { api, token } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { SiteRoutes } from "@iustitia/react-routes";

export const ContactModule = {
  module: "contacts",
  parents: ["Agenda"],
  singular: "Contato",
  plural: "Contatos",
  route: SiteRoutes.Contacts,
};

export interface ContactInterface {
  id?: string;
  avatar?: string;
  name?: string;
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
  userId?: string;
  officeId?: string;
  type?: string;
  position?: string;
  companyId?: string;
  company?: string;
}

type ModuleInterface = ContactInterface;
const RouteName = ContactModule.module;

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

export async function create(formData: FormData): Promise<ModuleInterface | Error> {
  try {
    formData.append("tenantId", token.getLocalTenantId());
    const { data } = await api.post(`/api/${RouteName}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(formData: FormData): Promise<ModuleInterface | Error> {
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
