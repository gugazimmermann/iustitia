import { MembersSimpleInterface } from "../members";
import { SimpleProfilesListInterface } from "../profiles";

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
  managersOffice?: SimpleProfilesListInterface[];
  usersOffice?: SimpleProfilesListInterface[];
}

export interface PlacesFormDataInterface {
  formData: PlacesInterface;
}

export interface PlacesActiveInterface {
  active: boolean;
  officeId: string;
}

export interface PlacesManagerInterface {
  officeId: string;
  managersList: MembersSimpleInterface[];
}

export interface PlacesUsersInterface {
  officeId: string;
  usersList: MembersSimpleInterface[];
}
