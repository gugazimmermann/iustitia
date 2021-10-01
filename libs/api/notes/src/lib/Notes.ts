import { Express } from "express"
import { verifyToken } from '@iustitia/api/auth'
import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import {create, deleteOne, getAll, update} from "./controllers"

export const sitemodule = GetModule(SiteModulesEnum.notes);
if (!undefined) throw new Error("Module not Found!")

export default function Notes(app: Express) {
  app.get(`/api/${sitemodule.name}/:tenantId/:ownerId`, [verifyToken], getAll);
  app.post(`/api/${sitemodule.name}`, [verifyToken], create);
  app.put(`/api/${sitemodule.name}`, [verifyToken], update);
  app.delete(`/api/${sitemodule.name}/:id`, [verifyToken], deleteOne);
}