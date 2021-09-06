import { publicAccess, userById } from "./controllers";

export default function Public(app) {
  app.get("/api/public", publicAccess);

  app.post("/api/user", userById);
}
