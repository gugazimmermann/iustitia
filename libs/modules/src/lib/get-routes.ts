import { ModulesEnum } from "./enum";
import { GetModule } from "./get-module";
import {
  AuthRoutesInterface,
  DashboardsRoutesInterface,
  SubscriptionsRoutesInterface,
  ProfilesRoutesInterface,
  PlacesRoutesInterface,
  MembersRoutesInterface,
  BCRoutesInterface,
  ScheduleRoutesInterface,
  FinancialRoutesInterface
} from "./interfaces";

export function GetRoutes(name: ModulesEnum):
  | AuthRoutesInterface
  | DashboardsRoutesInterface
  | SubscriptionsRoutesInterface
  | ProfilesRoutesInterface
  | PlacesRoutesInterface
  | MembersRoutesInterface
  | BCRoutesInterface
  | ScheduleRoutesInterface
  | FinancialRoutesInterface
  | undefined {
  const component = GetModule(name);
  if (component && component.routes) return component.routes;
  return undefined;
}
