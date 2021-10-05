import {ModulesEnum} from "@iustitia/modules";
import {ProfilesInterface} from "@iustitia/api/profiles";
import { errorHandler } from "@iustitia/site/shared-utils";
import api from "../api";
import { ApiFormDataReq } from "../interfaces";

export type ProfilesRes = ProfilesInterface;

function seeUserParams(profile: ProfilesRes): ProfilesRes {
  profile.isAdmin = profile.role === "Admin" ? true : false;
  if (profile.subscription)
    profile.isProfessional =
      profile.subscription?.type === "professional" ? true : false;
  return profile
}

export async function getOne(): Promise<ProfilesRes | Error> {
  try {
    const { data } = await api.get(`/api/${ModulesEnum.profiles}`);
    return seeUserParams(data)
  } catch (err) {
    return errorHandler(err)
  }
};

export async function update({ formData }: ApiFormDataReq): Promise<ProfilesRes | Error> {
  try {
    const { data } = await api.put(`/api/${ModulesEnum.profiles}`, formData);
    return seeUserParams(data)
  } catch (err) {
    return errorHandler(err)
  }
};
