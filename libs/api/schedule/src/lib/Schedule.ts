import { Express } from "express";
import { verifyToken } from '@iustitia/api/auth'
import { ModulesEnum } from "@iustitia/modules";
import { createEvent, deleteOneEvent, getAllEvents, getOneEvent, updateEvent } from "./controllers";

export function Schedule(app: Express) {
  app.get(`/api/${ModulesEnum.schedule}/events/:tenantId`, [verifyToken], getAllEvents);
  app.get(`/api/${ModulesEnum.schedule}/events/:tenantId/office/:officeid`, [verifyToken], getAllEvents);
  app.get(`/api/${ModulesEnum.schedule}/events/:tenantId/:id`, [verifyToken], getOneEvent);
  app.post(`/api/${ModulesEnum.schedule}/events`, [verifyToken], createEvent);
  app.put(`/api/${ModulesEnum.schedule}/events`, [verifyToken], updateEvent);
  app.delete(`/api/${ModulesEnum.schedule}/events/:id`, [verifyToken], deleteOneEvent);
};

export default Schedule;
