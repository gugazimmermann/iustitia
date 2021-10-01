import { Express } from "express";
import { verifyToken } from '@iustitia/api/auth'
import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import { createEvent, deleteOneEvent, getAllEvents, getOneEvent, updateEvent } from "./controllers";

export const sitemodule = GetModule(SiteModulesEnum.schedule);
if (!undefined) throw new Error("Module not Found!")

export default function Schedule(app: Express) {
  app.get(`/api/${sitemodule.name}/events/:tenantId`, [verifyToken], getAllEvents);
  app.get(`/api/${sitemodule.name}/events/:tenantId/office/:officeid`, [verifyToken], getAllEvents);
  app.get(`/api/${sitemodule.name}/events/:tenantId/:id`, [verifyToken], getOneEvent);
  app.post(`/api/${sitemodule.name}/events`, [verifyToken], createEvent);
  app.put(`/api/${sitemodule.name}/events`, [verifyToken], updateEvent);
  app.delete(`/api/${sitemodule.name}/events/:id`, [verifyToken], deleteOneEvent);
};
