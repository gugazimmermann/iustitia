import { ModulesEnum } from "@iustitia/modules";
import { PlacesInterface, ProfilesListInterface } from "@iustitia/api/places";
import { MembersSimpleInterface } from "@iustitia/api/members";
import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";
import token from "../auth/token";
import { ApiIdReq, ApiMessageRes } from "../interfaces";

export type PlacesRes = PlacesInterface;
export type ProfilesListRes = ProfilesListInterface;

export interface PlacesActiveReq {
  active: boolean;
  placeId: string;
}

export interface PlacesManagerRes {
  placeId: string;
  managersList: MembersSimpleInterface[];
}

export interface PlacesUsersRes {
  placeId: string;
  usersList: MembersSimpleInterface[];
}

export interface PlacesFormDataReq {
  formData: PlacesInterface;
}

export async function getAll(): Promise<PlacesRes[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.places}/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getOne({ id }: ApiIdReq): Promise<PlacesRes | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.places}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create({ formData }: PlacesFormDataReq): Promise<PlacesRes | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${ModulesEnum.places}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update({ formData }: PlacesFormDataReq): Promise<PlacesRes | Error> {
  try {
    const { data } = await api.put(`/api/${ModulesEnum.places}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOne({ id }: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    return await api.delete(`/api/${ModulesEnum.places}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};

export async function count(): Promise<number | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.places}/count/${tenantId}`);
    return data.places;
  } catch (err) {
    return errorHandler(err)
  }
};

export async function active({ active, placeId }: PlacesActiveReq): Promise<PlacesRes | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${ModulesEnum.places}/active/${tenantId}`, { active, placeId });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function managers({ placeId, managersList }: PlacesManagerRes): Promise<PlacesRes | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${ModulesEnum.places}/managers/${tenantId}`, { placeId, managersList });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function users({ placeId, usersList }: PlacesUsersRes): Promise<PlacesRes | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${ModulesEnum.places}/users/${tenantId}`, { placeId, usersList });
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
