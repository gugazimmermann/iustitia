import { api, token } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { SiteRoutes } from "@iustitia/react-routes";

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
  userId?: string;
  tenantId?: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
};

type ModuleInterface = OfficeInterface;
const RouteName = OfficeModule.module;

export async function getAll() {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getOne(id: string) {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(formData: ModuleInterface) {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post("/api/${RouteName}", formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(formData: ModuleInterface) {
  try {
    const { data } = await api.put("/api/${RouteName}", formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOne(id: string) {
  try {
    return await api.delete(`/api/${RouteName}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
