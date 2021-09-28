import { api } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";
import { SiteRoutes } from "@iustitia/react-routes";

export const ProfileModule = {
  module: "profile",
  parents: [],
  singular: "Perfil",
  plural: "Perfis",
  route: SiteRoutes.Profile,
};

export interface ProfileInterface {
  id?: string;
  role: string;
  isAdmin?: boolean;
  isProfessional?: boolean;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  subscription?: ProfileSubscriptionInterface;
};

export interface ProfileSubscriptionInterface {
  planId: string;
  reason: string;
  frequency: number;
  type: string;
  createdAt: string;
}

type ModuleInterface = ProfileInterface;
const RouteName = ProfileModule.module;

function seeUserParams(profile: ProfileInterface): ProfileInterface {
  profile.isAdmin = profile.role === "Admin" ? true : false;
  if (profile.subscription)
    profile.isProfessional =
      profile.subscription?.type === "professional" ? true : false;
  return profile
}

export async function update(formData: FormData): Promise<ModuleInterface | Error> {
  try {
    const { data } = await api.put(`/api/${RouteName}`, formData);
    return seeUserParams(data)
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getOne(): Promise<ModuleInterface | Error> {
  try {
    const { data } = await api.get(`/api/${RouteName}`);
    return seeUserParams(data)
  } catch (err) {
    return errorHandler(err)
  }
};
