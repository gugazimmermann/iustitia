import { Express } from "express";
import { publicAccess } from "./controllers";

export default function Public(app: Express) {
  app.get("/api/public", publicAccess);
}
