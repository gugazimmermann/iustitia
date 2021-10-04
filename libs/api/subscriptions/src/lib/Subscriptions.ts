import { Express } from "express";
import { verifyToken } from '@iustitia/api/auth'
import { GetComponent, ComponentsEnum } from "@iustitia/components";
import { getPlans, getSubscription, getPayments, getCreditcards } from "./controllers";

const component = GetComponent(ComponentsEnum.attachments);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.attachments}`);

export function Subscriptions(app: Express) {
  app.get(`/api/${component?.name}/plans`, getPlans);
  app.get(`/api/${component?.name}/subscription`, [verifyToken], getSubscription);
  app.get(`/api/${component?.name}/payments`, [verifyToken], getPayments);
  app.get(`/api/${component?.name}/creditcards`, [verifyToken], getCreditcards);
}

export default Subscriptions;
