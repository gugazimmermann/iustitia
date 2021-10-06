import {ModulesEnum} from "@iustitia/modules";
import {ProfilesInterface} from "@iustitia/api/profiles";
import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";
import { ApiFormDataReq } from "../interfaces";

export type ProfilesRes = ProfilesInterface;

export async function getOne(): Promise<ProfilesRes | Error> {
  try {
    const { data } = await api.get(`/api/${ModulesEnum.profiles}`);
    return data;
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update({ formData }: ApiFormDataReq): Promise<ProfilesRes | Error> {
  try {
    const { data } = await api.put(`/api/${ModulesEnum.profiles}`, formData);
    return data;
  } catch (err) {
    return errorHandler(err)
  }
};
