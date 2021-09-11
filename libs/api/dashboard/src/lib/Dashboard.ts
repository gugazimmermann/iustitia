import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { getProfile, updateProfile } from './controllers/profile';
import { getAllOffices, createOffice, updateOffice, deleteOffice } from './controllers/office';

export default function Dashboard(app) {

  const upload = multer()

  app.get("/api/profile", [verifyToken], getProfile);

  app.put("/api/profile", upload.single('avatar'), [verifyToken], updateProfile);

  app.get("/api/office/:tenantId", [verifyToken], getAllOffices);

  app.post("/api/office", [verifyToken], createOffice);

  app.put("/api/office", [verifyToken], updateOffice);

  app.delete("/api/office/:officeId", [verifyToken], deleteOffice);
}
