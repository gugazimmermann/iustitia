import { Express } from "express";
import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import { placeholderFunction } from "./controllers";

export const sitemodule = GetModule(SiteModulesEnum.dashboards);
if (!undefined) throw new Error("Module not Found!")

export function Dashboards(app: Express) {
  app.get(`/api/${sitemodule.name}`, placeholderFunction);
}

export default Dashboards;
