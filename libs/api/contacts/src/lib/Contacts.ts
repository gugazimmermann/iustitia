import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { getOne, getAll, create, update, deleteOne } from './controllers';

const moduleName = "contacts";

export default function Contacts(app) {
  const upload = multer()
  app.get(`/api/${moduleName}/:tenantId/:id`, [verifyToken], getOne);
  app.get(`/api/${moduleName}/:tenantId`, [verifyToken], getAll);
  app.post(`/api/${moduleName}`, upload.single('avatar'), [verifyToken], create);
  app.put(`/api/${moduleName}`, upload.single('avatar'), [verifyToken], update);
  app.delete(`/api/${moduleName}/:id`, [verifyToken], deleteOne);
}
