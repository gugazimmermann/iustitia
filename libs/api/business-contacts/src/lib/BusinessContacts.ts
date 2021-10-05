import { Express } from "express";
import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth';
import { ModulesEnum } from "@iustitia/modules";
import {
  createCompany,
  createPerson,
  deleteOneCompany,
  deleteOnePerson,
  getAllCompanies,
  getAllPersons,
  getOneCompany,
  getOnePerson,
  updateCompany,
  updatePerson
} from "./controllers";

export function BusinessContacts(app: Express) {
  const upload = multer()
  app.get(`/api/${ModulesEnum.businessContacts}/persons/:tenantId/:id`, [verifyToken], getOnePerson);
  app.get(`/api/${ModulesEnum.businessContacts}/persons/:tenantId`, [verifyToken], getAllPersons);
  app.post(`/api/${ModulesEnum.businessContacts}/persons`, upload.single('avatar'), [verifyToken], createPerson);
  app.put(`/api/${ModulesEnum.businessContacts}/persons`, upload.single('avatar'), [verifyToken], updatePerson);
  app.delete(`/api/${ModulesEnum.businessContacts}/persons/:id`, [verifyToken], deleteOnePerson);

  app.get(`/api/${ModulesEnum.businessContacts}/companies/:tenantId/:id`, [verifyToken], getOneCompany);
  app.get(`/api/${ModulesEnum.businessContacts}/companies/:tenantId`, [verifyToken], getAllCompanies);
  app.post(`/api/${ModulesEnum.businessContacts}/companies`, [verifyToken], createCompany);
  app.put(`/api/${ModulesEnum.businessContacts}/companies`, [verifyToken], updateCompany);
  app.delete(`/api/${ModulesEnum.businessContacts}/companies/:id`, [verifyToken], deleteOneCompany);
}

export default BusinessContacts;
