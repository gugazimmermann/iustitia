import { Express } from 'express';
import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import verifyToken from "./middleware/verifyToken";
import checkDuplicateEmail from "./middleware/checkDuplicateEmail";
import { signin, signup, forgotPassword, forgotPasswordCode, changePassword, refreshToken, me } from "./controllers";

const sitemodule = GetModule(SiteModulesEnum.auth);
if (!sitemodule) throw new Error("Module not Found!")

export function Auth(app: Express) {
  app.post(`/api/${sitemodule.name}/signup`, [checkDuplicateEmail], signup);

  app.post(`/api/${sitemodule.name}/signin`, signin);

  app.post(`/api/${sitemodule.name}/forgotpassword`, forgotPassword);

  app.post(`/api/${sitemodule.name}/forgotpasswordcode`, forgotPasswordCode);

  app.post(`/api/${sitemodule.name}/changepassword`, changePassword);

  app.post(`/api/${sitemodule.name}/refreshtoken`, refreshToken);

  app.get(`/api/${sitemodule.name}/me`, [verifyToken], me);
}

export default Auth;
