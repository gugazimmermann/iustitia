export interface BusinessContactsPersonsInterface {
  id?: string;
  avatar?: string;
  name: string;
  email?: string;
  phone?: string;
  zip?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  position?: string;
  companyId?: string;
  company?: string;
  comments?: string;
  type?: string;
  userId?: string;
  officeId?: string;
  tenantId?: string;
}

export interface BusinessContactsCompaniesInterface {
  id?: string;
  name: string;
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
  contacts?: {
    id: string;
    name: string;
    position: string;
  }[];
  tenantId?: string;
}
