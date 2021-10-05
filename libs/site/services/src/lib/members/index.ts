import { ModulesEnum } from "@iustitia/modules";
import { MembersInterface, MembersSimpleInterface} from "@iustitia/api/members";
import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";
import token from "../auth/token";
import { ApiIdReq, ApiMessageRes } from "../interfaces";

export type MembersRes = MembersInterface;

export type MembersSimpleRes = MembersSimpleInterface;

export interface MembersCreateReq {
  tenantId: string;
  code: string;
  password: string;
}

export interface MembersInviteCodeReq {
  tenantId: string;
  code: string;
}

export interface MembersCreateInviteReq {
  formData: {
    name: string;
    email: string,
    tenantId?: string
  }
}

export async function getAll(): Promise<MembersSimpleRes[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.members}/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getOne({ id }: ApiIdReq): Promise<MembersSimpleRes | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.members}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create({ tenantId, code, password }: MembersCreateReq): Promise<ApiMessageRes | Error> {
  try {
    const clearCode = +(code as string).toString().trim().replace(/ /g, "");
    const { data } = await api.post(`/api/${ModulesEnum.members}/${tenantId}`, { code: clearCode, password });
    return data
  } catch (err) {
    console.log(err)
    return errorHandler(err)

  }
};

export async function getInvites(): Promise<MembersRes[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.members}/invites/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getInviteCode({ tenantId, code }: MembersInviteCodeReq): Promise<MembersRes | Error> {
  try {
    const { data } = await api.get(`/api/${ModulesEnum.members}/invites/code/${tenantId}/${code}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createInvite({ formData }: MembersCreateInviteReq): Promise<MembersRes | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    formData.tenantId = tenantId;
    const { data } = await api.post(`/api/${ModulesEnum.members}/invites/${tenantId}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function sendInvite({ id }: ApiIdReq): Promise<MembersRes | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${ModulesEnum.members}/invites/send/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteInvite({ id }: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    return await api.delete(`/api/${ModulesEnum.members}/invites/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
