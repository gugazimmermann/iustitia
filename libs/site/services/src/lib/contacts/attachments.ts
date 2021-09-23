import { api, token } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { ModuleName, AttachmentInterface } from "@iustitia/site/contacts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createAttachments(formData: FormData, onUploadProgress: any): Promise<{ message: string } | Error> {
  try {
    return api.post(`/api/${ModuleName.module}/attachments`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    });
  } catch (err) {
    return errorHandler(err)
  }
}

export async function getAllAttachments(ownerId: string): Promise<AttachmentInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModuleName.module}/attachments/${tenantId}/${ownerId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOneAttachment(id: string): Promise<{ message: string } | Error> {
  try {
    return await api.delete(`/api/${ModuleName.module}/attachments/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
