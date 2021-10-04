import { MenuItemInterface } from "../layout";
import {
  AuthRoutesInterface,
  BusinessContactsRoutesInterface,
  DashboardsRoutesInterface,
  FinancialRoutesInterface,
  MembersRoutesInterface,
  PlacesRoutesInterface,
  ProfilesRoutesInterface,
  ScheduleRoutesInterface,
  SubscriptionsRoutesInterface
} from "../routes";

export interface ComponentsInterface {
  name: string;
  singular: string;
  plural: string;
  routes?: AuthRoutesInterface
  | DashboardsRoutesInterface
  | SubscriptionsRoutesInterface
  | ProfilesRoutesInterface
  | PlacesRoutesInterface
  | MembersRoutesInterface
  | BusinessContactsRoutesInterface
  | ScheduleRoutesInterface
  | FinancialRoutesInterface
  menu: MenuItemInterface[];
}
