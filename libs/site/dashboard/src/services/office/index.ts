import { api, TokenService } from "@iustitia/site/auth";
import { errorHandler } from "@iustitia/site/shared-utils";
import { IOffice } from "../../interfaces";

export async function getAll() {
  try {
    const tenantId = TokenService.getLocalTenantId();
    const { data } = await api.get(`/api/office/${tenantId}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function createOffice(office: IOffice) {
  try {
    office.tenantId = TokenService.getLocalTenantId();
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
