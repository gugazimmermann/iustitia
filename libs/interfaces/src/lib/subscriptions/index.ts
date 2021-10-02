export interface CardInfoInterface {
  id: string;
  name: string;
  expirationMonth: number;
  expirationYear: number;
  firstSixDigits: string;
  lastFourDigits: string;
}

export interface PlanInterface {
  id?: string;
  preapprovalPlanId?: string;
  collectorId?: number;
  applicationId?: number;
  reason?: string;
  status?: string;
  initPoint?: string;
  frequency?: number;
  frequencyType?: string;
  transactionAmount?: number;
  currencyId?: string;
  type?: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface SubscriptionInterface {
  id?: string;
  userId?: string;
  planId: string;
  reason: string;
  frequency: number;
  frequencyType: string;
  transactionAmount: number;
  status: boolean;
  type?: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}


export interface PaymentInterface {
  id?: string;
  userId?: string;
  transactionAmount: number;
  status: string;
  paidDate: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface CreditCardInterface {
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

export interface SubscriptionForm {
  name: string;
  cardNumber: string;
  cardExpiration: string;
  securityCode: string;
  documentType: string;
  document: string;
};

export interface IdentificationInterface {
  id: string;
  name: string;
  type: string;
  min_length: number;
  max_length: number;
}

export interface CreateCardTokenInterface {
  cardNumber: string;
  cardholderName: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  securityCode: string;
  identificationType: string;
  identificationNumber: string;
}

export interface CardTokenInterface {
  card_number_length: number;
  cardholder: {
    identification: {
      number: string;
      type: string;
    };
    name: string;
  };
  date_created: string;
  date_due: string;
  date_last_updated: string;
  expiration_month: number;
  expiration_year: number;
  first_six_digits: string;
  id: string;
  last_four_digits: string;
  live_mode: boolean;
  luhn_validatio: boolean;
  public_key: string;
  require_esc: boolean;
  security_code_length: number;
}
