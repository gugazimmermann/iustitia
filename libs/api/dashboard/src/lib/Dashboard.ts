import * as multer from 'multer';
import { verifyToken } from '@iustitia/api/auth'
import { updateProfile } from './controllers';

export default function Dashboard(app) {

  const upload = multer()

  app.post("/api/profile", upload.single('avatar'), [verifyToken], updateProfile);
}
