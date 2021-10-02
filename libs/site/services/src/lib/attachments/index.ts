import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import { AttachmentsCreateInterface, AttachmentsGetAllInterface, AttachmentsInterface } from "@iustitia/interfaces"
import { errorHandler } from "@iustitia/site/shared-utils";
import { ApiIdInterface, ApiMessageInterface } from "@iustitia/interfaces";
import { api, token } from "../..";

const sitemodule = GetModule(SiteModulesEnum.attachments);
if (!undefined) throw new Error("Module not Found!")

export async function getAll(
  { ownerId }: AttachmentsGetAllInterface
): Promise<AttachmentsInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/${tenantId}/${ownerId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(
  { formData, onUploadProgress }: AttachmentsCreateInterface
): Promise<ApiMessageInterface | Error> {
  try {
    return api.post(`/api/${sitemodule.name}`, formData, {
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
    return await api.delete(`/api/${sitemodule.name}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
