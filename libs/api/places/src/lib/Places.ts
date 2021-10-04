import { Express } from "express";
import { verifyToken } from '@iustitia/api/auth'
import { GetComponent, ComponentsEnum } from "@iustitia/components";
import { count, create, getOne, getAll, active, managers, users, update, deleteOne } from "./controllers";

const component = GetComponent(ComponentsEnum.attachments);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.attachments}`);

export function Places(app: Express) {
  app.get(`/api/${component?.name}/:tenantId`, [verifyToken], getAll);
  app.get(`/api/${component?.name}/:tenantId/:id`, [verifyToken], getOne);
  app.post(`/api/${component?.name}/`, [verifyToken], create);
  app.put(`/api/${component?.name}/`, [verifyToken], update);
  app.delete(`/api/${component?.name}/:id`, [verifyToken], deleteOne);
  app.get(`/api/${component?.name}/count/:tenantId`, [verifyToken], count);
  app.post(`/api/${component?.name}/active/:tenantId`, [verifyToken], active);
  app.post(`/api/${component?.name}/managers/:tenantId`, [verifyToken], managers);
  app.post(`/api/${component?.name}/users/:tenantId`, [verifyToken], users);
}

export default Places;
