import { Express } from "express";
import { verifyToken } from '@iustitia/api/auth'
import { getOne, getAll, create, update, deleteOne } from './controllers';

export const moduleName = "calendar";

export default function Companies(app: Express) {
  app.get(`/api/${moduleName}/:tenantId/:id`, [verifyToken], getOne);
  app.get(`/api/${moduleName}/:tenantId`, [verifyToken], getAll);
  app.get(`/api/${moduleName}/:tenantId/office/:officeid`, [verifyToken], getAll);
  app.post(`/api/${moduleName}`, [verifyToken], create);
  app.put(`/api/${moduleName}`, [verifyToken], update);
  app.delete(`/api/${moduleName}/:id`, [verifyToken], deleteOne);
}
