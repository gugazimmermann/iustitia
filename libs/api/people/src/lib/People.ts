import { Express } from "express"
import { verifyToken } from '@iustitia/api/auth'
import { getInviteCode, createUser, sendInvite, createInvite, getAll, getInvites, deleteInvite, getList } from './controllers';

export const moduleName = "people";

export default function People(app: Express) {
  // invites
  app.post(`/api/${moduleName}/invites/create/:tenantId`, [verifyToken], createInvite);

  // public
  app.get(`/api/${moduleName}/code/:tenantId/:code`, getInviteCode);
  app.post(`/api/${moduleName}/user/:tenantId`, createUser);


  // app.get(`/api/${moduleName}/:tenantId/:id`, [verifyToken], getOne);
  app.get(`/api/${moduleName}/:tenantId`, [verifyToken], getAll);
  app.get(`/api/${moduleName}/invites/:tenantId`, [verifyToken], getInvites);
  app.post(`/api/${moduleName}/invites/:tenantId/:id`, [verifyToken], sendInvite);

  // used in offices to select users and managers
  app.get(`/api/${moduleName}/list/:tenantId`, [verifyToken], getList);

  app.delete(`/api/${moduleName}/:id`, [verifyToken], deleteInvite);
}
