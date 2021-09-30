import { MembersSimpleInterface } from "../members";
import { ProfileInterface } from "../profile";

export interface PlaceFormDataInterface {
  formData: PlaceInterface;
}

export interface PlaceActiveInterface {
  active: boolean;
  officeId: string;
}

export interface PlaceManagerInterface {
  officeId: string;
  managersList: MembersSimpleInterface[];
}

export interface PlaceUsersInterface {
  officeId: string;
  usersList: MembersSimpleInterface[];
}

export interface PlaceInterface {
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
  active: boolean;
  managersOffice?: ProfileInterface[];
  usersOffice?: ProfileInterface[];
  tenantId?: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
};
