import { Express } from "express";
import * as multer from 'multer';
import { GetComponent, ComponentsEnum } from "@iustitia/components";
import { verifyToken } from '@iustitia/api/auth'
import { create, getAll, deleteOne } from "./controllers";

const component = GetComponent(ComponentsEnum.attachments);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.attachments}`);
export const attchmentPath = component.name;

export function Attachments(app: Express) {
  const upload = multer()
  app.get(`/api/${component?.name}/:tenantId/:ownerId`, [verifyToken], getAll);
  app.post(`/api/${component?.name}`, upload.array('attachments'), [verifyToken], create);
  app.delete(`/api/${component?.name}/:id`, [verifyToken], deleteOne);
};

export default Attachments;
