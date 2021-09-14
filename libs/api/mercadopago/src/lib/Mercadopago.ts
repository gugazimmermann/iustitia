import { subscription } from "./controllers";

export default function Public(app) {
  app.get("/mp/subscription", subscription);
}
