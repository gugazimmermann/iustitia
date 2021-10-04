import { ProfilesInterface } from "@iustitia/interfaces";
import { errorHandler } from "@iustitia/site/shared-utils";
import { ApiFormDataInterface } from "@iustitia/interfaces";
import { api } from "../..";
import { GetComponent, ComponentsEnum } from "@iustitia/components";

const component = GetComponent(ComponentsEnum.profiles);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.profiles}`)

function seeUserParams(profile: ProfilesInterface): ProfilesInterface {
  profile.isAdmin = profile.role === "Admin" ? true : false;
  if (profile.subscription)
    profile.isProfessional =
      profile.subscription?.type === "professional" ? true : false;
  return profile
}

export async function getOne(): Promise<ProfilesInterface | Error> {
  try {
    const { data } = await api.get(`/api/${component?.name}`);
    return seeUserParams(data)
  } catch (err) {
    return errorHandler(err)
  }
};


export async function update(
  { formData }: ApiFormDataInterface
): Promise<ProfilesInterface | Error> {
  try {
    const { data } = await api.put(`/api/${component?.name}`, formData);
    return seeUserParams(data)
  } catch (err) {
    return errorHandler(err)
  }
};
