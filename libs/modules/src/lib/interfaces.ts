export interface MenuItemInterface {
  name: string;
  icon: string;
  subItems: MenuSubItemInterface[];
}

export interface MenuSubItemInterface {
  name: string;
  link: string;
}

export interface ModulesInterface {
  name: string;
  singular: string;
  plural: string;
  routes?: AuthRoutesInterface
  | DashboardsRoutesInterface
  | SubscriptionsRoutesInterface
  | ProfilesRoutesInterface
  | PlacesRoutesInterface
  | MembersRoutesInterface
  | BCRoutesInterface
  | ScheduleRoutesInterface
  | FinancialRoutesInterface
  menu: MenuItemInterface[];
}

export interface AuthRoutesInterface {
  signIn: string;
  forgotPassword: string;
  changePassword: string;
  signUp: string;
  plans: string;
  subscription: string;
}

export interface DashboardsRoutesInterface {
  dashboards: string;
  places: string;
  process: string;
}

export interface SubscriptionsRoutesInterface {
  subscription: string;
}

export interface ProfilesRoutesInterface {
  profile: string;
}

export interface PlacesRoutesInterface {
  list: string;
  add: string;
  update: string;
  details: string;
}

export interface MembersRoutesInterface {
  list: string;
  add: string;
  update: string;
  details: string;
  invite: string;
}

export interface BCRoutesInterface {
  listPersons: string;
  addPerson: string;
  updatePerson: string;
  detailsPerson: string;
  listContacts: string;
  addContact: string;
  updateContact: string;
  detailsContact: string;
  listSuppliers: string;
  addSupplier: string;
  updateSupplier: string;
  detailsSupplier: string;
  listCompanies: string;
  addCompany: string;
  updateCompany: string;
  detailsCompany: string;
}

export interface ScheduleRoutesInterface {
  calendar: string;
  schedule: string;
}

export interface FinancialRoutesInterface {
  list: string;
  add: string;
  update: string;
  details: string;
}
