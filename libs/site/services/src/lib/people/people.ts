import { api, token } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { SiteRoutes } from "@iustitia/react-routes";

export const PeopleModule = {
  module: "people",
  parents: ["Colaboradores"],
  singular: "Pessoa",
  plural: "Pessoas",
  route: SiteRoutes.People,
};

export interface PeopleInterface {
  id?: string;
  name?: string;
  email?: string;
  code?: string;
  tenantId?: string;
  updatedAt?: Date;
}

export interface SimpleUserInterface {
  id: string;
  avatar: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  active: boolean;
}

type ModuleInterface = PeopleInterface;
const RouteName = PeopleModule.module;

export async function getAll(): Promise<SimpleUserInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getOne(id: string): Promise<SimpleUserInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createInvite(formData: { name: string; email: string, tenantId?: string }): Promise<ModuleInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    formData.tenantId = tenantId;
    const { data } = await api.post(`/api/${RouteName}/invites/create/${tenantId}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getInvites(): Promise<PeopleInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/invites/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function sendInvite(id: string): Promise<ModuleInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${RouteName}/invites/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteInvite(id: string): Promise<{ message: string } | Error> {
  try {
    return await api.delete(`/api/${RouteName}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getInviteCode(tenantId: string, code: string): Promise<{ message: string } | Error> {
  try {
    const { data } = await api.get(`/api/${RouteName}/code/${tenantId}/${code}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createUser(tenantId: string, code: string, password: string): Promise<{ message: string } | Error> {
  try {
    const clearCode = +(code as string).toString().trim().replace(/ /g, "");
    const { data } = await api.post(`/api/${RouteName}/user/${tenantId}`, { code: clearCode, password });
    return data
  } catch (err) {
    console.log(err)
    return errorHandler(err)

  }
};

// used in offices to select users and managers
export async function list(): Promise<SimpleUserInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/list/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
