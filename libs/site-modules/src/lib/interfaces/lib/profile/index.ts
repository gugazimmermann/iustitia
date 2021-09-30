import { SubscriptionInterface } from "../subscriptions";

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
  subscription?: SubscriptionInterface;
};
