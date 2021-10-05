import { Express } from "express";
import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth';
import { ModulesEnum } from "@iustitia/modules";
import { create, getAll, deleteOne } from "./controllers";

export function Attachments(app: Express) {
  const upload = multer();
  app.get(`/api/${ModulesEnum.attachments}/:tenantId/:ownerId`, [verifyToken], getAll);
  app.post(`/api/${ModulesEnum.attachments}`, upload.array('attachments'), [verifyToken], create);
  app.delete(`/api/${ModulesEnum.attachments}/:id`, [verifyToken], deleteOne);
};

export default Attachments;
