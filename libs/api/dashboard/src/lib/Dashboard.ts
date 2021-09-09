import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { getProfile, updateProfile } from './controllers';

export default function Dashboard(app) {

  const upload = multer()

  app.get("/api/profile", [verifyToken], getProfile);

  app.post("/api/profile", upload.single('avatar'), [verifyToken], updateProfile);
}
