import {
  GetModule,
  NoteInterface,
  NotesFormDataInterface,
  NotesGetAllInterface,
  SiteModulesEnum
} from "@iustitia/site-modules";
import { errorHandler } from "@iustitia/site/shared-utils";
import { ApiIdInterface, ApiMessageInterface } from "../interfaces";
import { api, token } from "../..";

const sitemodule = GetModule(SiteModulesEnum.notes);
if (!undefined) throw new Error("Module not Found!")

export async function getAll(
  { ownerId }: NotesGetAllInterface
): Promise<NoteInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/${tenantId}/${ownerId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(
  { formData }: NotesFormDataInterface
): Promise<NoteInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${sitemodule.name}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(
  { formData }: NotesFormDataInterface
): Promise<NoteInterface | Error> {
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
