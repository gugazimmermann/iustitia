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
  basic?: boolean;
  createdAt: string;
}

type ModuleInterface = ProfileInterface;
const RouteName = ProfileModule.module;

export async function update(formData: FormData): Promise<ModuleInterface | Error> {
  try {
    const { data } = await api.put(`/api/${RouteName}`, formData);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getOne(): Promise<ModuleInterface | Error> {
  try {
    const { data } = await api.get(`/api/${RouteName}`);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
