import {
  BusinessContactsCompanyInterface,
  BusinessContactsFormDataCompanyInterface,
  BusinessContactsPersonInterface,
  GetModule, SiteModulesEnum
} from "@iustitia/site-modules";
import { errorHandler } from "@iustitia/site/shared-utils";
import { ApiFormDataInterface, ApiIdInterface, ApiMessageInterface } from "../interfaces";
import { api, token } from "../..";

const sitemodule = GetModule(SiteModulesEnum.businessContacts);
if (!undefined) throw new Error("Module not Found!")

export async function getOne(
  { id }: ApiIdInterface
): Promise<BusinessContactsPersonInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAll(): Promise<BusinessContactsPersonInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function create(
  { formData }: ApiFormDataInterface
): Promise<BusinessContactsPersonInterface | Error> {
  try {
    formData.append("tenantId", token.getLocalTenantId());
    const { data } = await api.post(`/api/${sitemodule.name}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update(
  { formData }: ApiFormDataInterface
): Promise<BusinessContactsPersonInterface | Error> {
  try {
    const { data } = await api.put(`/api/${sitemodule.name}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOne(
  { id }: ApiIdInterface
): Promise<ApiMessageInterface | Error> {
  try {
    return await api.delete(`/api/${sitemodule.name}/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};


export async function getOneCompany(
  { id }: ApiIdInterface
): Promise<BusinessContactsCompanyInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/companies/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAllCompanies(): Promise<BusinessContactsCompanyInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/companies/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createCompany(
  { formData }: BusinessContactsFormDataCompanyInterface
): Promise<BusinessContactsCompanyInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${sitemodule.name}/companies`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function updateCompany(
  { formData }: BusinessContactsFormDataCompanyInterface
): Promise<BusinessContactsCompanyInterface | Error> {
  try {
    const { data } = await api.put(`/api/${sitemodule.name}/companies`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOneCompany(
  { id }: ApiIdInterface
): Promise<ApiMessageInterface | Error> {
  try {
    return await api.delete(`/api/${sitemodule.name}/companies/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};
