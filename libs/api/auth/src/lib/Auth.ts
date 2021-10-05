import { Express } from 'express';
import { ModulesEnum } from "@iustitia/modules";
import verifyToken from "./middleware/verifyToken";
import checkDuplicateEmail from "./middleware/checkDuplicateEmail";
import {
  signin,
  signup,
  forgotPassword,
  forgotPasswordCode,
  changePassword,
  refreshToken,
  me
} from "./controllers";

export function Auth(app: Express) {
  app.post(`/api/${ModulesEnum.auth}/signup`, [checkDuplicateEmail], signup);
  app.post(`/api/${ModulesEnum.auth}/signin`, signin);
  app.post(`/api/${ModulesEnum.auth}/forgotpassword`, forgotPassword);
  app.post(`/api/${ModulesEnum.auth}/forgotpasswordcode`, forgotPasswordCode);
  app.post(`/api/${ModulesEnum.auth}/changepassword`, changePassword);
  app.post(`/api/${ModulesEnum.auth}/refreshtoken`, refreshToken);
  app.get(`/api/${ModulesEnum.auth}/me`, [verifyToken], me);
}

export default Auth;
