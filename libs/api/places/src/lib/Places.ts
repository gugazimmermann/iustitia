import { Express } from "express";
import { verifyToken } from '@iustitia/api/auth'
import { ModulesEnum } from "@iustitia/modules";
import {
  count,
  create,
  getOne,
  getAll,
  active,
  managers,
  users,
  update,
  deleteOne
} from "./controllers";

export function Places(app: Express) {
  app.get(`/api/${ModulesEnum.places}/:tenantId`, [verifyToken], getAll);
  app.get(`/api/${ModulesEnum.places}/:tenantId/:id`, [verifyToken], getOne);
  app.post(`/api/${ModulesEnum.places}/`, [verifyToken], create);
  app.put(`/api/${ModulesEnum.places}/`, [verifyToken], update);
  app.delete(`/api/${ModulesEnum.places}/:id`, [verifyToken], deleteOne);
  app.get(`/api/${ModulesEnum.places}/count/:tenantId`, [verifyToken], count);
  app.post(`/api/${ModulesEnum.places}/active/:tenantId`, [verifyToken], active);
  app.post(`/api/${ModulesEnum.places}/managers/:tenantId`, [verifyToken], managers);
  app.post(`/api/${ModulesEnum.places}/users/:tenantId`, [verifyToken], users);
}

export default Places;
