import { publicAccess, userById } from "./controllers";

export default function Public(app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/public", publicAccess);

  app.post("/api/user", userById);
}
