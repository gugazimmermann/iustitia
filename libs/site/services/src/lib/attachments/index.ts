import { AttachmentsCreateInterface, AttachmentsGetAllInterface, AttachmentsInterface } from "@iustitia/interfaces"
import { GetComponent, ComponentsEnum } from "@iustitia/components";
import { errorHandler } from "@iustitia/site/shared-utils";
import { ApiIdInterface, ApiMessageInterface } from "@iustitia/interfaces";
import { api, token } from "../..";

const component = GetComponent(ComponentsEnum.attachments);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.attachments}`)

export async function getAll(
  { ownerId }: AttachmentsGetAllInterface
): Promise<AttachmentsInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${component?.name}/${tenantId}/${ownerId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(
  { formData, onUploadProgress }: AttachmentsCreateInterface
): Promise<ApiMessageInterface | Error> {
  try {
    return api.post(`/api/${component?.name}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    });
  } catch (err) {
    return errorHandler(err)
  }
}

export async function deleteOne(
  { id }: ApiIdInterface
): Promise<ApiMessageInterface | Error> {
  try {
    return await api.delete(`/api/${component?.name}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
