import { Express } from "express";
import { verifyToken } from '@iustitia/api/auth'
import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import { getPlans, getSubscription, getPayments, getCreditcards } from "./controllers";

const sitemodule = GetModule(SiteModulesEnum.subscriptions);
if (!sitemodule) throw new Error("Module not Found!")

export function Subscriptions(app: Express) {
  app.get(`/api/${sitemodule.name}/plans`, getPlans);
  app.get(`/api/${sitemodule.name}/subscription`, [verifyToken], getSubscription);
  app.get(`/api/${sitemodule.name}/payments`, [verifyToken], getPayments);
  app.get(`/api/${sitemodule.name}/creditcards`, [verifyToken], getCreditcards);
}

export default Subscriptions;
