import { Express } from "express";
import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { GetComponent, ComponentsEnum } from "@iustitia/components";
import { getProfile, updateProfile } from "./controllers";

const component = GetComponent(ComponentsEnum.attachments);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.attachments}`);

export function Profiles(app: Express) {
  const upload = multer()
  app.get(`/api/${component?.name}`, [verifyToken], getProfile);
  app.put(`/api/${component?.name}`, upload.single('avatar'), [verifyToken], updateProfile);
}

export default Profiles;
