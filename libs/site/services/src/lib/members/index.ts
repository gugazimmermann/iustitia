import { GetComponent, ComponentsEnum } from "@iustitia/components";
import {
  ApiIdInterface,
  ApiMessageInterface,
  MembersCreateInterface,
  MembersCreateInviteInterface,
  MembersInterface,
  MembersInviteCodeInterface,
  MembersSimpleInterface
} from "@iustitia/interfaces";
import { errorHandler } from "@iustitia/site/shared-utils";
import { api, token } from "../..";

const component = GetComponent(ComponentsEnum.members);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.members}`)


export async function getAll(): Promise<MembersSimpleInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${component?.name}/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getOne(
  { id }: ApiIdInterface
): Promise<MembersSimpleInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${component?.name}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(
  { tenantId, code, password }: MembersCreateInterface
): Promise<ApiMessageInterface | Error> {
  try {
    const clearCode = +(code as string).toString().trim().replace(/ /g, "");
    const { data } = await api.post(`/api/${component?.name}/${tenantId}`, { code: clearCode, password });
    return data
  } catch (err) {
    console.log(err)
    return errorHandler(err)

  }
};

export async function getInvites(): Promise<MembersInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${component?.name}/invites/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getInviteCode(
  { tenantId, code }: MembersInviteCodeInterface
): Promise<MembersInterface | Error> {
  try {
    const { data } = await api.get(`/api/${component?.name}/invites/code/${tenantId}/${code}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createInvite(
  { formData }: MembersCreateInviteInterface
): Promise<MembersInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    formData.tenantId = tenantId;
    const { data } = await api.post(`/api/${component?.name}/invites/${tenantId}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function sendInvite(
  { id }: ApiIdInterface
): Promise<MembersInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${component?.name}/invites/send/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteInvite(
  { id }: ApiIdInterface
): Promise<ApiMessageInterface | Error> {
  try {
    return await api.delete(`/api/${component?.name}/invites/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
