import { SimpleProfileListInterface } from "../profiles";

export interface PlacesInterface {
  id?: string;
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
  active?: boolean;
  tenantId?: string;
  managersOffice?: SimpleProfileListInterface[];
  usersOffice?: SimpleProfileListInterface[];
}
