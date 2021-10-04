import { Express } from "express";
import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { GetComponent, ComponentsEnum } from "@iustitia/components";
import { createCompany, createPerson, deleteOneCompany, deleteOnePerson, getAllCompanies, getAllPersons, getOneCompany, getOnePerson, updateCompany, updatePerson } from "./controllers";

const component = GetComponent(ComponentsEnum.attachments);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.attachments}`);
export const businessContactsPath = component?.name;

export function BusinessContacts(app: Express) {
  const upload = multer()
  app.get(`/api/${component?.name}/persons/:tenantId/:id`, [verifyToken], getOnePerson);
  app.get(`/api/${component?.name}/persons/:tenantId`, [verifyToken], getAllPersons);
  app.post(`/api/${component?.name}/persons`, upload.single('avatar'), [verifyToken], createPerson);
  app.put(`/api/${component?.name}/persons`, upload.single('avatar'), [verifyToken], updatePerson);
  app.delete(`/api/${component?.name}/persons/:id`, [verifyToken], deleteOnePerson);

  app.get(`/api/${component?.name}/companies/:tenantId/:id`, [verifyToken], getOneCompany);
  app.get(`/api/${component?.name}/companies/:tenantId`, [verifyToken], getAllCompanies);
  app.post(`/api/${component?.name}/companies`, [verifyToken], createCompany);
  app.put(`/api/${component?.name}/companies`, [verifyToken], updateCompany);
  app.delete(`/api/${component?.name}/companies/:id`, [verifyToken], deleteOneCompany);
}

export default BusinessContacts;
