import { Express } from "express";
import { ModulesEnum } from "@iustitia/modules";
import { placeholderFunction } from "./controllers";

export function Dashboards(app: Express) {
  app.get(`/api/${ModulesEnum.dashboards}`, placeholderFunction);
}

export default Dashboards;
