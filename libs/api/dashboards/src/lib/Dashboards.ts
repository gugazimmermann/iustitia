import { Express } from "express";
import { GetComponent, ComponentsEnum } from "@iustitia/components";
import { placeholderFunction } from "./controllers";

const component = GetComponent(ComponentsEnum.attachments);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.attachments}`);

export function Dashboards(app: Express) {
  app.get(`/api/${component?.name}`, placeholderFunction);
}

export default Dashboards;
