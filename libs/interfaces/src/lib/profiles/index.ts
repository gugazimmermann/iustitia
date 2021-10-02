import { SubscriptionInterface } from "../subscriptions";

export interface ProfilesListInterface {
  id: string;
  avatar: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  active: boolean;
}

export interface SimpleProfilesListInterface {
  id: string;
  name: string;
  avatar: string;
}

export interface ProfilesInterface {
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
  subscription?: SubscriptionInterface;
};
