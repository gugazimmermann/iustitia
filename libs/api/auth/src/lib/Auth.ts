import checkDuplicateEmail from "./middleware/checkDuplicateEmail";
import { signin, signup, refreshToken, userInfo } from "./controllers";
import verifyToken from "./middleware/verifyToken";

export default function Auth(app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup", [checkDuplicateEmail], signup);

  app.post("/api/auth/signin", signin);

  app.post("/api/auth/refreshtoken", refreshToken);

  app.get("/api/me", [verifyToken], userInfo);
}
