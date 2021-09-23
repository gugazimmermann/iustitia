import { api, token } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { NoteInterface, ModuleName } from "@iustitia/site/contacts";

export async function getAllNotes(ownerId: string): Promise<NoteInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModuleName.module}/notes/${tenantId}/${ownerId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createNote(formData: NoteInterface): Promise<NoteInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${ModuleName.module}/notes`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function updateNote(formData: NoteInterface): Promise<NoteInterface | Error> {
  try {
    const { data } = await api.put(`/api/${ModuleName.module}/notes`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOneNote(id: string): Promise<{ message: string } | Error> {
  try {
    return await api.delete(`/api/${ModuleName.module}/notes/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
