import { errorHandler } from "@iustitia/site/shared-utils";
import {
  ApiIdInterface,
  ApiMessageInterface,
  NotesInterface,
  NotesFormDataInterface,
  NotesGetAllInterface
} from "@iustitia/interfaces";
import { api, token } from "../..";
import { GetComponent, ComponentsEnum } from "@iustitia/components";

const component = GetComponent(ComponentsEnum.notes);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.notes}`)

export async function getAll(
  { ownerId }: NotesGetAllInterface
): Promise<NotesInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${component?.name}/${tenantId}/${ownerId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(
  { formData }: NotesFormDataInterface
): Promise<NotesInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${component?.name}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(
  { formData }: NotesFormDataInterface
): Promise<NotesInterface | Error> {
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
