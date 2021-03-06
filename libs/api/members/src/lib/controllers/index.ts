import { Op } from "sequelize";
import { Request, Response } from "express";
import { database, MembersInstance, UsersInstance } from '@iustitia/api/database';
import { InvitationEmail } from "@iustitia/api/email";
import { validateEmail } from '@iustitia/site/shared-utils';
import { createUser } from "@iustitia/api/auth";

export interface MembersInterface {
  id?: string;
  name: string;
  email: string;
  code?: string;
  tenantId?: string;
  updatedAt?: Date;
}

function dataToMembersResult(data: MembersInstance): MembersInterface {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    updatedAt: data.updatedAt,
  }
}

export interface MembersSimpleInterface {
  id: string;
  avatar?: string;
  name: string;
  phone?: string;
  email?: string;
  role?: string;
  active?: boolean;
}


function dataToProfileListResult(data: UsersInstance): MembersSimpleInterface | undefined {
  if (data.profile && data.roles && data.roles.length) {
    return {
      id: data.id,
      avatar: data.profile.avatar,
      name: data.profile.name,
      phone: data.profile.phone,
      email: data.profile.email,
      role: data.roles[0].name,
      active: data.active,
    }
  }
  return undefined;
}

function dataToSimpleProfileListResult(data: UsersInstance): MembersSimpleInterface | undefined {
  if (data.profile) {
    return {
      id: data.id,
      name: data.profile.name,
      avatar: data.profile.avatar,
    }
  }
  return undefined;
}

export async function getAll(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Users.findAll({
      where: {
        tenant: user.tenant,
        // id: {
        //   [Op.not]: user.id
        // },
      }, include: ["profile", "roles"]
    });
    const resultData = [] as MembersSimpleInterface[];
    if (data.length > 0) {
      data.forEach(d => {
        const r = dataToProfileListResult(d);
        if (r) resultData.push(r)
      });
    }
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getOne(req, res): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Users.findOne({
      where: {
        tenant: user.tenant, id,
      }, include: ["profile", "roles"]
    });
    ;
    return res.status(200).send(dataToProfileListResult(data as UsersInstance));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function create(req: Request, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  const { code, password } = req.body;
  if (!code || !password) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    await database.Sequelize.transaction(async () => {
      const invite = await database.Members.findOne({ where: { tenantId, code } });
      if (!invite) return res.status(404).send({ message: "Nenhum registro encontrado!" });
      const mainUser = await database.Users.findOne({ where: { id: invite.userId }, include: "subscription" })
      if (!mainUser || !mainUser.subscription) return res.status(404).send({ message: "Nenhum usuário encontrado!" });
      await createUser({
        name: invite.name,
        email: invite.email,
        password: req.body.password,
        tenant: tenantId,
        roleName: "User",
        subscription: {
          reason: mainUser.subscription.reason,
          frequency: mainUser.subscription.frequency,
          frequencyType: mainUser.subscription.frequencyType,
          transactionAmount: mainUser.subscription.transactionAmount,
          status: true,
          type: mainUser.subscription.type,
          planId: mainUser.subscription.planId,
        }
      });
      await invite.destroy();
      await invite.save();
      return;
    });
    return res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getList(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Users.findAll({
      where:
      {
        tenant: user.tenant,
        active: true
      },
      attributes: ['id'],
      include: [
        {
          model: database.Profiles,
          attributes: ['id', 'avatar', 'name'],
        },
      ],
      order: [[database.Profiles, 'name', 'ASC']],
    });
    const resultData = [] as MembersSimpleInterface[];
    if (data.length > 0) {
      data.forEach(d => {
        const r = dataToSimpleProfileListResult(d);
        if (r) resultData.push(r)
      });
    }
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getInvites(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Members.findAll({
      where: { tenantId: user.tenant }
    });
    const resultData = [] as MembersInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToMembersResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getInviteCode(req: Request, res: Response): Promise<Response> {
  const { tenantId, code } = req.params;
  if (!tenantId || !code) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Members.findOne({ where: { tenantId: tenantId, code: code } });
    if (!data) return res.status(400).send({ message: "nao encontrado!" });
    return res.status(200).send({ ...dataToMembersResult(data), code: data.code });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createInvite(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  const { body } = req;
  if (!body.name || !body.email || !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId }, include: ["profile", "subscription"] });
    if (!user || !user.subscription || !user.profile) return res.status(404).send({ message: "Nao encontrado!" });
    if (user.subscription.type !== "professional") {
      const countMembers = await database.Members.count({ where: { tenantId: user.tenant } });
      const countUsers = await database.Users.count({
        where: {
          tenant: user.tenant,
          id: {
            [Op.not]: user.id
          },
        }
      });
      if (countMembers > 0 || countUsers > 0) return res.status(401).send({ message: "Plano sem permissão!" });
    }
    const seeEmail = await database.Members.findOne({ where: { email: body.email } });
    if (seeEmail) return res.status(401).send({ message: "Convite já criado, tente enviar novamente!" });
    const member = {
      name: body.name,
      email: body.email,
      code: Math.random().toString().substring(2, 8),
      userId: user.id,
      tenantId: user.tenant
    }
    const data = await database.Members.create(member);
    await InvitationEmail({ ...member, user: user.profile.name });
    return res.status(201).send(dataToMembersResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function sendInvite(req, res): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId }, include: "profile" });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    if (!user.profile) return res.status(404).send({ message: "Nenhum perfil encontrado!" });
    const invite = await database.Members.findOne({ where: { id: id } });
    if (!invite) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const profile = await database.Profiles.findOne({ where: { email: invite.email } });
    if (profile) return res.status(403).send({ message: "Convite já foi aceito!" });
    invite.changed('updatedAt', true);
    await invite.save();
    await InvitationEmail({
      name: invite.name,
      email: invite.email,
      code: invite.code,
      tenantId: invite.tenantId,
      user: user.profile.name
    });
    return res.status(202).send({ message: "Convite Enviado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteInvite(req, res): Promise<Response> {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Members.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    await database.Members.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
