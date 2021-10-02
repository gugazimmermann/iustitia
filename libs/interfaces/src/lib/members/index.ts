export interface MembersInterface {
  id?: string;
  name: string;
  email: string;
  code?: string;
  tenantId?: string;
  updatedAt?: Date;
}

export interface MembersSimpleInterface {
  id: string;
  avatar: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  active: boolean;
}

export interface MembersCreateInterface {
  tenantId: string;
  code: string;
  password: string;
}

export interface MembersInviteCodeInterface {
  tenantId: string;
  code: string;
}

export interface MembersCreateInviteInterface {
  formData: {
    name: string;
    email: string,
    tenantId?: string
  }
}
