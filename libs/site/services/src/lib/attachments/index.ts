import { ModulesEnum } from "@iustitia/modules";
import { AttachmentsInterface } from "@iustitia/api/attachments";
import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";
import token from "../auth/token";
import { ApiIdReq, ApiMessageRes } from "../interfaces";

export type AttachmentsRes = AttachmentsInterface;

export interface AttachmentsGetAllReq {
  ownerId: string;
}

export interface AttachmentsCreateReq {
  formData: FormData;
  onUploadProgress: any;
}

export async function getAll({ ownerId }: AttachmentsGetAllReq): Promise<AttachmentsRes[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.attachments}/${tenantId}/${ownerId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create({ formData, onUploadProgress }: AttachmentsCreateReq): Promise<ApiMessageRes | Error> {
  try {
    return api.post(`/api/${ModulesEnum.attachments}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    });
  } catch (err) {
    return errorHandler(err)
  }
}

export async function deleteOne({ id }: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    return await api.delete(`/api/${ModulesEnum.attachments}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
