import { ModulesEnum } from "@iustitia/modules";
import { NotesInterface } from "@iustitia/api/notes";
import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";
import token from "../auth/token";
import { ApiIdReq, ApiMessageRes } from "../interfaces";

export type NotesRes = NotesInterface;

export interface NotesGetAllReq {
  ownerId: string;
}

export interface NotesFormDataReq {
  formData: NotesInterface;
}

export async function getAll({ ownerId }: NotesGetAllReq): Promise<NotesRes[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.notes}/${tenantId}/${ownerId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create({ formData }: NotesFormDataReq): Promise<NotesRes | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${ModulesEnum.notes}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update({ formData }: NotesFormDataReq): Promise<NotesRes | Error> {
  try {
    const { data } = await api.put(`/api/${ModulesEnum.notes}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOne({ id }: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    return await api.delete(`/api/${ModulesEnum.notes}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
