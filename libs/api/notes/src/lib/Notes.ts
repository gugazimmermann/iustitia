import { Express } from "express"
import { verifyToken } from '@iustitia/api/auth'
import { GetComponent, ComponentsEnum } from "@iustitia/components";
import {create, deleteOne, getAll, update} from "./controllers"

const component = GetComponent(ComponentsEnum.attachments);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.attachments}`);

export function Notes(app: Express) {
  app.get(`/api/${component?.name}/:tenantId/:ownerId`, [verifyToken], getAll);
  app.post(`/api/${component?.name}`, [verifyToken], create);
  app.put(`/api/${component?.name}`, [verifyToken], update);
  app.delete(`/api/${component?.name}/:id`, [verifyToken], deleteOne);
}

export default Notes;
