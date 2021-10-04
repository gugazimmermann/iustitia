import { Express } from "express";
import { verifyToken } from '@iustitia/api/auth'
import { GetComponent, ComponentsEnum } from "@iustitia/components";
import { createEvent, deleteOneEvent, getAllEvents, getOneEvent, updateEvent } from "./controllers";

const component = GetComponent(ComponentsEnum.attachments);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.attachments}`);

export function Schedule(app: Express) {
  app.get(`/api/${component?.name}/events/:tenantId`, [verifyToken], getAllEvents);
  app.get(`/api/${component?.name}/events/:tenantId/office/:officeid`, [verifyToken], getAllEvents);
  app.get(`/api/${component?.name}/events/:tenantId/:id`, [verifyToken], getOneEvent);
  app.post(`/api/${component?.name}/events`, [verifyToken], createEvent);
  app.put(`/api/${component?.name}/events`, [verifyToken], updateEvent);
  app.delete(`/api/${component?.name}/events/:id`, [verifyToken], deleteOneEvent);
};

export default Schedule;
