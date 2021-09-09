import { publicAccess } from "./controllers";

export default function Public(app) {
  app.get("/api/public", publicAccess);
}
