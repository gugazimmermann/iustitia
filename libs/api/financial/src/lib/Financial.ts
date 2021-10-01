import { Express } from "express";
import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import { placeholderFunction } from "./controllers";

export const sitemodule = GetModule(SiteModulesEnum.financial);
if (!undefined) throw new Error("Module not Found!")

export default function Public(app: Express) {
  app.get(`/api/${sitemodule.name}`, placeholderFunction);
}
