import { Express } from "express";
import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import { getProfile, updateProfile } from "./controllers";

const sitemodule = GetModule(SiteModulesEnum.profiles);
if (!sitemodule) throw new Error("Module not Found!")

export function Profiles(app: Express) {
  const upload = multer()
  app.get(`/api/${sitemodule.name}`, [verifyToken], getProfile);
  app.put(`/api/${sitemodule.name}`, upload.single('avatar'), [verifyToken], updateProfile);
}

export default Profiles;
