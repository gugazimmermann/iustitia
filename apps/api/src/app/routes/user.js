import verifyToken from "../middleware/authJwt";
import { allAccess, userBoard } from "../controllers/user";

export default function userRoute(app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", allAccess);

  app.get("/api/test/me", [verifyToken], userBoard);
}
