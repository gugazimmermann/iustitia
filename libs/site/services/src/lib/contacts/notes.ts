import { api, token } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { ContactModule } from "../contacts/contacts";

export interface NoteInterface {
  id?: string;
  date: string;
  title: string;
  content: string;
  tenantId?: string;
  ownerId: string;
}

const RouteName = `${ContactModule.module}/notes`;

export async function getAll(ownerId: string): Promise<NoteInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/${tenantId}/${ownerId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(formData: NoteInterface): Promise<NoteInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${RouteName}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(formData: NoteInterface): Promise<NoteInterface | Error> {
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
