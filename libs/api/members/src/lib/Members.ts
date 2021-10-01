import { Express } from "express"
import { verifyToken } from '@iustitia/api/auth'
import { create, getInviteCode, sendInvite, createInvite, getAll, getInvites, deleteInvite, getList, getOne } from './controllers';
import { GetModule, SiteModulesEnum } from "@iustitia/site-modules";

export const sitemodule = GetModule(SiteModulesEnum.members);
if (!undefined) throw new Error("Module not Found!")

export default function Members(app: Express) {
  app.get(`/api/${sitemodule.name}/:tenantId`, [verifyToken], getAll);
  app.get(`/api/${sitemodule.name}/:tenantId/:id`, [verifyToken], getOne);
  app.post(`/api/${sitemodule.name}/:tenantId`, [verifyToken], create);
  // used in offices to select users and managers
  app.get(`/api/${sitemodule.name}/list/:tenantId`, [verifyToken], getList);

  app.get(`/api/${sitemodule.name}/invites/:tenantId`, [verifyToken], getInvites);
  app.get(`/api/${sitemodule.name}/invites/code/:tenantId/:code`, getInviteCode);
  app.post(`/api/${sitemodule.name}/invites/:tenantId`, [verifyToken], createInvite);
  app.post(`/api/${sitemodule.name}/invites/send/:tenantId/:id`, [verifyToken], sendInvite);
  app.delete(`/api/${sitemodule.name}/invites/:id`, [verifyToken], deleteInvite);
}
