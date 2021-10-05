import { Express } from "express";
import multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { ModulesEnum } from "@iustitia/modules";
import { getProfile, updateProfile } from "./controllers";

export function Profiles(app: Express) {
  const upload = multer();
  app.get(`/api/${ModulesEnum.profiles}`, [verifyToken], getProfile);
  app.put(`/api/${ModulesEnum.profiles}`, upload.single('avatar'), [verifyToken], updateProfile);
}

export default Profiles;
