import SiteModulesEnum from "../../../SiteModulesEnum";
import { MenuItemInterface } from "../layout";

export interface SiteModulesInterface {
  name: SiteModulesEnum;
  singular: string;
  plural: string;
  menu: MenuItemInterface[];
}
