import { Express } from 'express';
import checkDuplicateEmail from "./middleware/checkDuplicateEmail";
import {
  signin,
  signup,
  forgotPassword,
  forgotPasswordCode,
  changePassword,
  refreshToken,
  userInfo,
  getAllPlans
} from "./controllers";
import verifyToken from "./middleware/verifyToken";

export default function Auth(app: Express) {
  app.post("/auth/signup", [checkDuplicateEmail], signup);

  app.post("/auth/signin", signin);

  app.post("/auth/forgotpassword", forgotPassword);

  app.post("/auth/forgotpasswordcode", forgotPasswordCode);

  app.post("/auth/changepassword", changePassword);

  app.post("/auth/refreshtoken", refreshToken);

  app.get("/auth/plans", getAllPlans);

  app.get("/auth/me", [verifyToken], userInfo);
}
