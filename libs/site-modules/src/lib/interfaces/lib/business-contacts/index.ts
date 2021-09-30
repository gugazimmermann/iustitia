export interface BusinessContactsFormDataCompanyInterface {
  formData: BusinessContactsCompanyInterface;
}

export interface BusinessContactsPersonInterface {
  id?: string;
  avatar?: string;
  name?: string;
  email?: string;
  phone?: string;
  zip?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  comments?: string;
  tenantId?: string;
  userId?: string;
  officeId?: string;
  type?: string;
  position?: string;
  companyId?: string;
  company?: string;
}

export interface BusinessContactsCompanyInterface {
  id?: string;
  name?: string;
  site?: string;
  email?: string;
  phone?: string;
  zip?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  comments?: string;
  tenantId?: string;
  contacts?: {
    id: string;
    name: string;
    position: string;
  }[]
}
