import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { getOne, getAll, create, update, deleteOne } from './controllers';
import { createAttachments, deleteOneAttachment, getAllAttachments } from './controllers/attachments';
import { getAllNotes, createNote, updateNote, deleteOneNote } from './controllers/notes';

export const moduleName = "contacts";

export default function Contacts(app) {
  const upload = multer()
  app.get(`/api/${moduleName}/:tenantId/:id`, [verifyToken], getOne);
  app.get(`/api/${moduleName}/:tenantId`, [verifyToken], getAll);
  app.post(`/api/${moduleName}`, upload.single('avatar'), [verifyToken], create);
  app.put(`/api/${moduleName}`, upload.single('avatar'), [verifyToken], update);
  app.delete(`/api/${moduleName}/:id`, [verifyToken], deleteOne);

  app.get(`/api/${moduleName}/attachments/:tenantId/:ownerId`, [verifyToken], getAllAttachments);
  app.post(`/api/${moduleName}/attachments`, upload.array('attachments'), [verifyToken], createAttachments);
  app.delete(`/api/${moduleName}/attachments/:id`, [verifyToken], deleteOneAttachment);

  app.get(`/api/${moduleName}/notes/:tenantId/:ownerId`, [verifyToken], getAllNotes);
  app.post(`/api/${moduleName}/notes`, [verifyToken], createNote);
  app.put(`/api/${moduleName}/notes`, [verifyToken], updateNote);
  app.delete(`/api/${moduleName}/notes/:id`, [verifyToken], deleteOneNote);
}
