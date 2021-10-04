import { Express } from "express"
import { verifyToken } from '@iustitia/api/auth'
import { create, getInviteCode, sendInvite, createInvite, getAll, getInvites, deleteInvite, getList, getOne } from './controllers';
import { GetComponent, ComponentsEnum } from "@iustitia/components";

const component = GetComponent(ComponentsEnum.attachments);
if (!component || !component?.name) throw new Error(`App Component not Found: ${ComponentsEnum.attachments}`);

export function Members(app: Express) {
  app.get(`/api/${component?.name}/:tenantId`, [verifyToken], getAll);
  app.get(`/api/${component?.name}/:tenantId/:id`, [verifyToken], getOne);
  app.post(`/api/${component?.name}/:tenantId`, [verifyToken], create);
  // used in offices to select users and managers
  app.get(`/api/${component?.name}/list/:tenantId`, [verifyToken], getList);

  app.get(`/api/${component?.name}/invites/:tenantId`, [verifyToken], getInvites);
  app.get(`/api/${component?.name}/invites/code/:tenantId/:code`, getInviteCode);
  app.post(`/api/${component?.name}/invites/:tenantId`, [verifyToken], createInvite);
  app.post(`/api/${component?.name}/invites/send/:tenantId/:id`, [verifyToken], sendInvite);
  app.delete(`/api/${component?.name}/invites/:id`, [verifyToken], deleteInvite);
}

export default Members;
