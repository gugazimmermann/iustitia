import { Express } from "express";
import { verifyToken } from '@iustitia/api/auth'
import { ModulesEnum } from "@iustitia/modules";
import {
  getPlans,
  getSubscription,
  getPayments,
  getCreditcards
} from "./controllers";

export function Subscriptions(app: Express) {
  app.get(`/api/${ModulesEnum.subscriptions}/plans`, getPlans);
  app.get(`/api/${ModulesEnum.subscriptions}/subscription`, [verifyToken], getSubscription);
  app.get(`/api/${ModulesEnum.subscriptions}/payments`, [verifyToken], getPayments);
  app.get(`/api/${ModulesEnum.subscriptions}/creditcards`, [verifyToken], getCreditcards);
}

export default Subscriptions;
