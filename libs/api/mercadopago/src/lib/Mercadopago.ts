import { subscription } from "./controllers";

export default function Mercadopago(app) {
  app.get("/mp/subscription", subscription);
}
