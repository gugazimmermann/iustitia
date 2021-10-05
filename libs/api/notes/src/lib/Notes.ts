import { Express } from "express"
import { verifyToken } from '@iustitia/api/auth'
import { ModulesEnum } from "@iustitia/modules";
import {create, deleteOne, getAll, update} from "./controllers"

export function Notes(app: Express) {
  app.get(`/api/${ModulesEnum.notes}/:tenantId/:ownerId`, [verifyToken], getAll);
  app.post(`/api/${ModulesEnum.notes}`, [verifyToken], create);
  app.put(`/api/${ModulesEnum.notes}`, [verifyToken], update);
  app.delete(`/api/${ModulesEnum.notes}/:id`, [verifyToken], deleteOne);
}

export default Notes;
