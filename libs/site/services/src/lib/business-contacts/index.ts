import { ModulesEnum } from "@iustitia/modules";
import { BCCompaniesInterface, BCPersonsInterface } from "@iustitia/api/business-contacts";
import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";
import token from "../auth/token";
import { ApiFormDataReq, ApiIdReq, ApiMessageRes } from "../interfaces";

export type BCPersonsRes = BCPersonsInterface

export type BCCompaniesRes = BCCompaniesInterface

export interface BCFormDataCompaniesReq {
  formData: BCCompaniesRes;
}

export async function getOnePerson({ id }: ApiIdReq): Promise<BCPersonsRes | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.businessContacts}/persons/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAllPersons(): Promise<BCPersonsRes[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.businessContacts}/persons/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createPerson({ formData }: ApiFormDataReq): Promise<BCPersonsRes | Error> {
  try {
    formData.append("tenantId", token.getLocalTenantId());
    const { data } = await api.post(`/api/${ModulesEnum.businessContacts}/persons`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function updatePerson({ formData }: ApiFormDataReq): Promise<BCPersonsRes | Error> {
  try {
    const { data } = await api.put(`/api/${ModulesEnum.businessContacts}/persons`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOnePerson({ id }: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    return await api.delete(`/api/${ModulesEnum.businessContacts}/persons/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getOneCompany({ id }: ApiIdReq): Promise<BCCompaniesRes | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.businessContacts}/companies/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAllCompanies(): Promise<BCCompaniesRes[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${ModulesEnum.businessContacts}/companies/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createCompany({ formData }: BCFormDataCompaniesReq): Promise<BCCompaniesRes | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${ModulesEnum.businessContacts}/companies`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function updateCompany({ formData }: BCFormDataCompaniesReq): Promise<BCCompaniesRes | Error> {
  try {
    const { data } = await api.put(`/api/${ModulesEnum.businessContacts}/companies`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOneCompany({ id }: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    return await api.delete(`/api/${ModulesEnum.businessContacts}/companies/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
