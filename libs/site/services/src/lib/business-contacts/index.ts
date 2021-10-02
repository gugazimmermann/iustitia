import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import { errorHandler } from "@iustitia/site/shared-utils";
import {
  ApiFormDataInterface,
  ApiIdInterface,
  ApiMessageInterface,
  BusinessContactsCompaniesInterface,
  BusinessContactsFormDataCompaniesInterface,
  BusinessContactsPersonsInterface
} from "@iustitia/interfaces";
import { api, token } from "../..";

const sitemodule = GetModule(SiteModulesEnum.businessContacts);
if (!sitemodule) throw new Error("Module not Found!")

export async function getOnePerson(
  { id }: ApiIdInterface
): Promise<BusinessContactsPersonsInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/persons/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAllPersons(): Promise<BusinessContactsPersonsInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/persons/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createPerson(
  { formData }: ApiFormDataInterface
): Promise<BusinessContactsPersonsInterface | Error> {
  try {
    formData.append("tenantId", token.getLocalTenantId());
    const { data } = await api.post(`/api/${sitemodule.name}/persons`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function updatePerson(
  { formData }: ApiFormDataInterface
): Promise<BusinessContactsPersonsInterface | Error> {
  try {
    const { data } = await api.put(`/api/${sitemodule.name}/persons`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOnePerson(
  { id }: ApiIdInterface
): Promise<ApiMessageInterface | Error> {
  try {
    return await api.delete(`/api/${sitemodule.name}/persons/${id}`);
  } catch (err) {
    return errorHandler(err)
  }
};


export async function getOneCompany(
  { id }: ApiIdInterface
): Promise<BusinessContactsCompaniesInterface | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/companies/${tenantId}/${id}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAllCompanies(): Promise<BusinessContactsCompaniesInterface[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/${sitemodule.name}/companies/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createCompany(
  { formData }: BusinessContactsFormDataCompaniesInterface
): Promise<BusinessContactsCompaniesInterface | Error> {
  try {
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/api/${sitemodule.name}/companies`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function updateCompany(
  { formData }: BusinessContactsFormDataCompaniesInterface
): Promise<BusinessContactsCompaniesInterface | Error> {
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
