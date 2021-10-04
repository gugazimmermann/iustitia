import { Express } from 'express';
import { GetComponent, ComponentsEnum } from "@iustitia/components";
import verifyToken from "./middleware/verifyToken";
import checkDuplicateEmail from "./middleware/checkDuplicateEmail";
import { signin, signup, forgotPassword, forgotPasswordCode, changePassword, refreshToken, me } from "./controllers";

const component = GetComponent(ComponentsEnum.attachments);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.attachments}`);

export function Auth(app: Express) {
  app.post(`/api/${component?.name}/signup`, [checkDuplicateEmail], signup);

  app.post(`/api/${component?.name}/signin`, signin);

  app.post(`/api/${component?.name}/forgotpassword`, forgotPassword);

  app.post(`/api/${component?.name}/forgotpasswordcode`, forgotPasswordCode);

  app.post(`/api/${component?.name}/changepassword`, changePassword);

  app.post(`/api/${component?.name}/refreshtoken`, refreshToken);

  app.get(`/api/${component?.name}/me`, [verifyToken], me);
}

export default Auth;
