import { Express } from "express"
import { verifyToken } from '@iustitia/api/auth';
import { ModulesEnum } from "@iustitia/modules";
import {
  create,
  getInviteCode,
  sendInvite,
  createInvite,
  getAll,
  getInvites,
  deleteInvite,
  getList,
  getOne
} from './controllers';

export function Members(app: Express) {
  app.get(`/api/${ModulesEnum.members}/:tenantId`, [verifyToken], getAll);
  app.get(`/api/${ModulesEnum.members}/:tenantId/:id`, [verifyToken], getOne);
  app.post(`/api/${ModulesEnum.members}/:tenantId`, [verifyToken], create);
  // used in places to select users and managers
  app.get(`/api/${ModulesEnum.members}/list/:tenantId`, [verifyToken], getList);

  app.get(`/api/${ModulesEnum.members}/invites/:tenantId`, [verifyToken], getInvites);
  app.get(`/api/${ModulesEnum.members}/invites/code/:tenantId/:code`, getInviteCode);
  app.post(`/api/${ModulesEnum.members}/invites/:tenantId`, [verifyToken], createInvite);
  app.post(`/api/${ModulesEnum.members}/invites/send/:tenantId/:id`, [verifyToken], sendInvite);
  app.delete(`/api/${ModulesEnum.members}/invites/:id`, [verifyToken], deleteInvite);
}

export default Members;
