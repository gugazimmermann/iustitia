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

  app.post("/auth/signup", [checkDuplicateEmail], signup);

  app.post("/auth/signin", signin);

  app.post("/auth/refreshtoken", refreshToken);

  app.get("/auth/me", [verifyToken], userInfo);
}
