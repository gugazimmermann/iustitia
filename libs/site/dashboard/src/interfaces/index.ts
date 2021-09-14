export interface IProfile {
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
  subscription?: ISubscription
};

export interface ISubscription {
  planId: string;
  reason: string;
  frequency: number;
  createdAt: string;
}

export interface IOffice {
  id?: string;
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
  userId?: string;
  tenantId?: string;
  updatedAt?: string;
  createdAt?: string;
};
