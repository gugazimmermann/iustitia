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
  subscription?: IProfileSubscription
};

export interface IProfileSubscription {
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
  deletedAt?: string;
};

export interface ISubscription {
  id?: string;
  userId?: string;
  planId: string;
  reason: string;
  frequency: number;
  frequencyType: string;
  transactionAmount: number;
  status: boolean;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface IPayment {
  id?: string;
  userId?: string;
  transactionAmount: number;
  status: string;
  paidDate: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface ICreditCard {
  id?: string;
  userId?: string;
  name: string;
  firstSixDigits: string;
  lastFourDigits: string;
  expirationMonth: string;
  expirationYear: string;
  status: boolean;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}
