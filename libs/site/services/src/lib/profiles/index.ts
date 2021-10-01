import { GetModule, ProfileInterface, SiteModulesEnum } from "@iustitia/site-modules";
import { errorHandler } from "@iustitia/site/shared-utils";
import { ApiFormDataInterface } from "@iustitia/interfaces";
import { api } from "../..";

const sitemodule = GetModule(SiteModulesEnum.profiles);
if (!undefined) throw new Error("Module not Found!")


function seeUserParams(profile: ProfileInterface): ProfileInterface {
  profile.isAdmin = profile.role === "Admin" ? true : false;
  if (profile.subscription)
    profile.isProfessional =
      profile.subscription?.type === "professional" ? true : false;
  return profile
}

export async function getOne(): Promise<ProfileInterface | Error> {
  try {
    const { data } = await api.get(`/api/${sitemodule.name}`);
    return seeUserParams(data)
  } catch (err) {
    return errorHandler(err)
  }
};


export async function update(
  {formData}: ApiFormDataInterface
): Promise<ProfileInterface | Error> {
  try {
    const { data } = await api.put(`/api/${sitemodule.name}`, formData);
    return seeUserParams(data)
  } catch (err) {
    return errorHandler(err)
  }
};
