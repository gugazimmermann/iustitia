import {
  GetModule,
  PlaceActiveInterface,
  PlaceFormDataInterface,
  PlaceInterface,
  PlaceManagerInterface,
  PlaceUsersInterface,
  SiteModulesEnum
} from "@iustitia/site-modules";
import { errorHandler } from "@iustitia/site/shared-utils";
import { ApiIdInterface, ApiMessageInterface } from "../interfaces";
import { api, token } from "../..";

const sitemodule = GetModule(SiteModulesEnum.places);
if (!undefined) throw new Error("Module not Found!")

export async function count(): Promise<number | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/count/${tenantId}`);
    return data.offices;
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAll(): Promise<PlaceInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getOne(
  { id }: ApiIdInterface
): Promise<PlaceInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(
  { formData }: PlaceFormDataInterface
): Promise<PlaceInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${sitemodule.name}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function active(
  { active, officeId }: PlaceActiveInterface
): Promise<PlaceInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${sitemodule.name}/active/${tenantId}`, { active, officeId });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function managers(
  { officeId, managersList }: PlaceManagerInterface
): Promise<PlaceInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${sitemodule.name}/managers/${tenantId}`, { officeId, managersList });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function users(
  { officeId, usersList }: PlaceUsersInterface
): Promise<PlaceInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${sitemodule.name}/users/${tenantId}`, { officeId, usersList });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(
  { formData }: PlaceFormDataInterface
): Promise<PlaceInterface | Error> {
  try {
    const { data } = await api.put(`/api/${sitemodule.name}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOne(
  { id }: ApiIdInterface
): Promise<ApiMessageInterface | Error> {
  try {
    return await api.delete(`/api/${sitemodule.name}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
