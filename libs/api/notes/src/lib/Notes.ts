import { Express } from "express"
import { verifyToken } from '@iustitia/api/auth'
import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import {create, deleteOne, getAll, update} from "./controllers"

const sitemodule = GetModule(SiteModulesEnum.notes);
if (!sitemodule) throw new Error("Module not Found!")

export function Notes(app: Express) {
  app.get(`/api/${sitemodule.name}/:tenantId/:ownerId`, [verifyToken], getAll);
  app.post(`/api/${sitemodule.name}`, [verifyToken], create);
  app.put(`/api/${sitemodule.name}`, [verifyToken], update);
  app.delete(`/api/${sitemodule.name}/:id`, [verifyToken], deleteOne);
}

export default Notes;
