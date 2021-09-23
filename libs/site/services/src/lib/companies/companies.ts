import { api, token } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { ModuleInterface, ModuleName } from "@iustitia/site/companies";

export async function getOne(id: string): Promise<ModuleInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModuleName.module}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAll(): Promise<ModuleInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModuleName.module}/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(formData: ModuleInterface): Promise<ModuleInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${ModuleName.module}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(formData: ModuleInterface): Promise<ModuleInterface | Error> {
  try {
    const { data } = await api.put(`/api/${ModuleName.module}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOne(id: string): Promise<{ message: string } | Error> {
  try {
    return await api.delete(`/api/${ModuleName.module}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
