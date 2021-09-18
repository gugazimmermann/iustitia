import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { getOne, getAll, create, update, deleteOne, createAttachments, getAllAttachments, deleteOneAttachment } from './controllers';

export const moduleName = "contacts";

export default function Contacts(app) {
  const upload = multer()
  app.get(`/api/${moduleName}/:tenantId/:id`, [verifyToken], getOne);
  app.get(`/api/${moduleName}/:tenantId`, [verifyToken], getAll);
  app.post(`/api/${moduleName}`, upload.single('avatar'), [verifyToken], create);
  app.put(`/api/${moduleName}`, upload.single('avatar'), [verifyToken], update);
  app.delete(`/api/${moduleName}/:id`, [verifyToken], deleteOne);
  app.post(`/api/${moduleName}/attachments`, upload.array('attachments'), [verifyToken], createAttachments);
  app.get(`/api/${moduleName}/attachments/:tenantId/:ownerId`, [verifyToken], getAllAttachments);
  app.delete(`/api/${moduleName}/attachments/:id`, [verifyToken], deleteOneAttachment);
}
