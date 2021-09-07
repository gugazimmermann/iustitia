import checkDuplicateEmail from "./middleware/checkDuplicateEmail";
import { signin, signup, forgotPassword, forgotPasswordCode, changePassword, refreshToken, userInfo } from "./controllers";
import verifyToken from "./middleware/verifyToken";

export default function Auth(app) {
  app.post("/auth/signup", [checkDuplicateEmail], signup);

  app.post("/auth/signin", signin);

  app.post("/auth/forgotpassword", forgotPassword);

  app.post("/auth/forgotpasswordcode", forgotPasswordCode);

  app.post("/auth/changepassword", changePassword);

  app.post("/auth/refreshtoken", refreshToken);

  app.get("/auth/me", [verifyToken], userInfo);

  app.get("/auth/currentuser", [verifyToken], userInfo);
}
