import { Express } from "express";
import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { getOne, getAll, create, update, deleteOne } from './controllers';
import { getAllNotes, createNote, updateNote, deleteOneNote } from './controllers/notes';

export const moduleName = "contacts";

export default function Contacts(app: Express) {
  const upload = multer()
  app.get(`/api/${moduleName}/:tenantId/:id`, [verifyToken], getOne);
  app.get(`/api/${moduleName}/:tenantId`, [verifyToken], getAll);
  app.post(`/api/${moduleName}`, upload.single('avatar'), [verifyToken], create);
  app.put(`/api/${moduleName}`, upload.single('avatar'), [verifyToken], update);
  app.delete(`/api/${moduleName}/:id`, [verifyToken], deleteOne);

  app.get(`/api/${moduleName}/notes/:tenantId/:ownerId`, [verifyToken], getAllNotes);
  app.post(`/api/${moduleName}/notes`, [verifyToken], createNote);
  app.put(`/api/${moduleName}/notes`, [verifyToken], updateNote);
  app.delete(`/api/${moduleName}/notes/:id`, [verifyToken], deleteOneNote);
}
