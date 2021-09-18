import { api, TokenService } from "@iustitia/site/auth";
import { errorHandler } from "@iustitia/site/shared-utils";
import { ModuleInterface, ModuleName } from "../..";
import { AttachmentInterface } from "../Contacts";

export async function getOne(id: string): Promise<ModuleInterface | Error> {
  try {
    const tenantId = TokenService.getLocalTenantId();
    const { data } = await api.get(`/api/${ModuleName.module}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAll(): Promise<ModuleInterface[] | Error> {
  try {
    const tenantId = TokenService.getLocalTenantId();
    const { data } = await api.get(`/api/${ModuleName.module}/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(formData: FormData): Promise<ModuleInterface | Error> {
  try {
    formData.append("tenantId", TokenService.getLocalTenantId());
    const { data } = await api.post(`/api/${ModuleName.module}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(formData: FormData): Promise<ModuleInterface | Error> {
  try {
    const { data } = await api.put(`/api/${ModuleName.module}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOne(id: string): Promise<{ message: string } | Error> {
  try {
    return await api.delete(`/api/${ModuleName.module}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};

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
    const tenantId = TokenService.getLocalTenantId();
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
