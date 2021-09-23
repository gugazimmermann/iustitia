import { api, token } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { IOffice } from "../../../../dashboard/src/interfaces";

export async function getOne(officeId: string) {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/office/${tenantId}/${officeId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getAll() {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/api/office/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createOffice(office: IOffice) {
  try {
    office.tenantId = token.getLocalTenantId();
    const { data } = await api.post("/api/office", office);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function updateOffice(office: IOffice) {
  try {
    const { data } = await api.put("/api/office", office);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function deleteOffice(officeId: string) {
  try {
    return await api.delete(`/api/office/${officeId}`);
  } catch (err) {
    return errorHandler(err)
  }
};
