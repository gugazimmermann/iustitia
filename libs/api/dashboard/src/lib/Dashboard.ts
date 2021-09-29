import { Express } from "express";
import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { getProfile, updateProfile } from './controllers/profile';
import * as OfficeController from './controllers/office';
import { getCreditcards, getPayments, getPlans, getSubscription } from './controllers/subscriptions';

export default function Dashboard(app: Express) {

  const upload = multer()

  app.get("/api/profile", [verifyToken], getProfile);
  app.put("/api/profile", upload.single('avatar'), [verifyToken], updateProfile);

  app.get(`/api/${OfficeController.moduleName}/count/:tenantId`, [verifyToken], OfficeController.count);
  app.get(`/api/${OfficeController.moduleName}/:tenantId/:id`, [verifyToken], OfficeController.getOne);
  app.get(`/api/${OfficeController.moduleName}/:tenantId`, [verifyToken], OfficeController.getAll);
  app.post(`/api/${OfficeController.moduleName}/active/:tenantId`, [verifyToken], OfficeController.active);
  app.post(`/api/${OfficeController.moduleName}/managers/:tenantId`, [verifyToken], OfficeController.managers);
  app.post(`/api/${OfficeController.moduleName}/users/:tenantId`, [verifyToken], OfficeController.users);
  app.post(`/api/${OfficeController.moduleName}/`, [verifyToken], OfficeController.create);
  app.put(`/api/${OfficeController.moduleName}/`, [verifyToken], OfficeController.update);
  app.delete(`/api/${OfficeController.moduleName}/:id`, [verifyToken], OfficeController.deleteOne);

  app.get("/api/plans", getPlans);
  app.get("/api/subscription", [verifyToken], getSubscription);
  app.get("/api/payments", [verifyToken], getPayments);
  app.get("/api/creditcards", [verifyToken], getCreditcards);

}
