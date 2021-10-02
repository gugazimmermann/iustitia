import { MenuItemInterface } from "../layout";

export interface SiteModulesInterface {
  name: string;
  singular: string;
  plural: string;
  menu: MenuItemInterface[];
}
