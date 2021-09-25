import { api, token } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { ContactModule } from "../contacts/contacts";

export interface AttachmentInterface {
  id: string;
  date: string;
  name: string;
  link: string;
}

const RouteName = `${ContactModule.module}/attachments`;

export async function getAll(ownerId: string): Promise<AttachmentInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${RouteName}/${tenantId}/${ownerId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function create(formData: FormData, onUploadProgress: any): Promise<{ message: string } | Error> {
  try {
    return api.post(`/api/${RouteName}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    });
  } catch (err) {
    return errorHandler(err)
  }
}

export async function deleteOne(id: string): Promise<{ message: string } | Error> {
  try {
    return await api.delete(`/api/${RouteName}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
