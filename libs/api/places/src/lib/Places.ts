import { Express } from "express";
import { verifyToken } from '@iustitia/api/auth'
import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import { count, create, getOne, getAll, active, managers, users, update, deleteOne } from "./controllers";

const sitemodule = GetModule(SiteModulesEnum.places);
if (!sitemodule) throw new Error("Module not Found!")

export function Places(app: Express) {
  app.get(`/api/${sitemodule.name}/:tenantId`, [verifyToken], getAll);
  app.get(`/api/${sitemodule.name}/:tenantId/:id`, [verifyToken], getOne);
  app.post(`/api/${sitemodule.name}/`, [verifyToken], create);
  app.put(`/api/${sitemodule.name}/`, [verifyToken], update);
  app.delete(`/api/${sitemodule.name}/:id`, [verifyToken], deleteOne);
  app.get(`/api/${sitemodule.name}/count/:tenantId`, [verifyToken], count);
  app.post(`/api/${sitemodule.name}/active/:tenantId`, [verifyToken], active);
  app.post(`/api/${sitemodule.name}/managers/:tenantId`, [verifyToken], managers);
  app.post(`/api/${sitemodule.name}/users/:tenantId`, [verifyToken], users);
}

export default Places;
