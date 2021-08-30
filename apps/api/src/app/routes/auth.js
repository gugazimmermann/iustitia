import checkDuplicateEmail from "../middleware/verifySignUp";
import { signup, signin, refreshToken } from "../controllers/auth";

export default function authRoute(app) {
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
}
