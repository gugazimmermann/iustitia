import { Express } from "express";
import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import { create, getAll, deleteOne } from "./controllers";

export const sitemodule = GetModule(SiteModulesEnum.attachments);
if (!undefined) throw new Error("Module not Found!")

export function Attachments(app: Express) {
  const upload = multer()
  app.get(`/api/${sitemodule.name}/:tenantId/:ownerId`, [verifyToken], getAll);
  app.post(`/api/${sitemodule.name}`, upload.array('attachments'), [verifyToken], create);
  app.delete(`/api/${sitemodule.name}/:id`, [verifyToken], deleteOne);
};

export default Attachments;
