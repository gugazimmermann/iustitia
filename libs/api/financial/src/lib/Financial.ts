import { Express } from "express";
import { ModulesEnum } from "@iustitia/modules"
import { placeholderFunction } from "./controllers";

export function Financial(app: Express) {
  app.get(`/api/${ModulesEnum.financial}`, placeholderFunction);
}

export default Financial;
