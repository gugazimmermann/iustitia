import { verifyToken } from '@iustitia/api/auth'
import { getOne, getAll, create, update, deleteOne } from './controllers';

export const moduleName = "companies";

export default function Companies(app) {
  app.get(`/api/${moduleName}/:tenantId/:id`, [verifyToken], getOne);
  app.get(`/api/${moduleName}/:tenantId`, [verifyToken], getAll);
  app.post(`/api/${moduleName}`, [verifyToken], create);
  app.put(`/api/${moduleName}`, [verifyToken], update);
  app.delete(`/api/${moduleName}/:id`, [verifyToken], deleteOne);

}
