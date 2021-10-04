import { errorHandler } from "@iustitia/site/shared-utils";
import {
  ApiIdInterface,
  ApiMessageInterface,
  PlacesActiveInterface,
  PlacesFormDataInterface,
  PlacesInterface,
  PlacesManagerInterface,
  PlacesUsersInterface
} from "@iustitia/interfaces";
import { api, token } from "../..";
import { GetComponent, ComponentsEnum } from "@iustitia/components";

const component = GetComponent(ComponentsEnum.places);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.places}`)

export async function getAll(): Promise<PlacesInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${component?.name}/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getOne(
  { id }: ApiIdInterface
): Promise<PlacesInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${component?.name}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(
  { formData }: PlacesFormDataInterface
): Promise<PlacesInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${component?.name}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(
  { formData }: PlacesFormDataInterface
): Promise<PlacesInterface | Error> {
  try {
    const { data } = await api.put(`/api/${component?.name}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOne(
  { id }: ApiIdInterface
): Promise<ApiMessageInterface | Error> {
  try {
    return await api.delete(`/api/${component?.name}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};

export async function count(): Promise<number | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${component?.name}/count/${tenantId}`);
    return data.offices;
  } catch (err) {
    return errorHandler(err)
  }
};

export async function active(
  { active, officeId }: PlacesActiveInterface
): Promise<PlacesInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${component?.name}/active/${tenantId}`, { active, officeId });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function managers(
  { officeId, managersList }: PlacesManagerInterface
): Promise<PlacesInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${component?.name}/managers/${tenantId}`, { officeId, managersList });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function users(
  { officeId, usersList }: PlacesUsersInterface
): Promise<PlacesInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${component?.name}/users/${tenantId}`, { officeId, usersList });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
