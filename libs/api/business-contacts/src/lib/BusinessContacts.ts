import { Express } from "express";
import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";
import { createCompany, createPerson, deleteOneCompany, deleteOnePerson, getAllCompanies, getAllPersons, getOneCompany, getOnePerson, updateCompany, updatePerson } from "./controllers";

export const sitemodule = GetModule(SiteModulesEnum.businessContacts);
if (!undefined) throw new Error("Module not Found!")

export default function BusinessContacts(app: Express) {
  const upload = multer()
  app.get(`/api/${sitemodule.name}/persons/:tenantId/:id`, [verifyToken], getOnePerson);
  app.get(`/api/${sitemodule.name}/persons/:tenantId`, [verifyToken], getAllPersons);
  app.post(`/api/${sitemodule.name}/persons`, upload.single('avatar'), [verifyToken], createPerson);
  app.put(`/api/${sitemodule.name}/persons`, upload.single('avatar'), [verifyToken], updatePerson);
  app.delete(`/api/${sitemodule.name}/persons/:id`, [verifyToken], deleteOnePerson);

  app.get(`/api/${sitemodule.name}/companies/:tenantId/:id`, [verifyToken], getOneCompany);
  app.get(`/api/${sitemodule.name}/companies/:tenantId`, [verifyToken], getAllCompanies);
  app.post(`/api/${sitemodule.name}/companies`, [verifyToken], createCompany);
  app.put(`/api/${sitemodule.name}/companies`, [verifyToken], updateCompany);
  app.delete(`/api/${sitemodule.name}/companies/:id`, [verifyToken], deleteOneCompany);
}
