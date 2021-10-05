/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { GetPaymentMethod } from './getPaymentMethod';

export type Identification = {
  id: string;
  name: string;
  type: string;
  min_length: number;
  max_length: number;
}

export type CreateCardToken = {
  cardNumber: string;
  cardholderName: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  securityCode: string;
  identificationType: string;
  identificationNumber: string;
}

export type CardToken = {
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

export type Mercadopago = {
    deviceProfileId: string
    key: string
    referer: string
    tokenId: string
    version: string
    sessionId: any
    initialized: boolean
    initializedInsights: boolean

    AJAX: (t: any) => void
    clearSession: () => void
    createDeviceProvider: (n: Function) => void
    createToken: (e: any, t: any) => void
    getAllPaymentMethods: (t: any) => any
    getIdentificationTypes: (t: any) => any
    getInstallments: (t: any, r: any) => any
    getIssuers: () => any
    getPaymentMethod: GetPaymentMethod
    getPaymentMethods: () => any
    initMercadopago: () => void
    setPaymentMethods: (e: any) => void
    setPublishableKey: (key: string) => void
    validateBinPattern: (e: any, t: any) => boolean
    validateCardNumber: (e: any, t: any, n: Function) => void
    validateCardholderName: (e: any) => boolean
    validateExpiryDate: (e: any, t: any) => boolean
    validateIdentification: (e: any, t: any) => boolean
    validateLuhn: (e: any) => boolean
    validateSecurityCode: (e: any, t: any, n: Function) => any
}

export type MercadoPago = {
    cardForm: (e: any) => any
    checkout: (e: any) => any
    constructor: (key: string, options: { locale: string }) => any
    createCardToken: (e: any) => Promise<any>
    getIdentificationTypes: () => Promise<any>
    getInstallments: (e: any) => Promise<any>
    getIssuers: (e: any) => Promise<any>
    getPaymentMethods: (e: any) => Promise<any>
}
