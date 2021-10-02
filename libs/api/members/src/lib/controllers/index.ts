import { Op } from "sequelize";
import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import { MembersInterface, ProfilesListInterface, SimpleProfilesListInterface } from "@iustitia/interfaces";
import { database, MembersInstance, AuthUsersInstance } from '@iustitia/api/database';
import { InvitationEmail } from "@iustitia/api/email";
import { validateEmail } from '@iustitia/site/shared-utils';

function dataToPeopleResult(data: MembersInstance): MembersInterface {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    updatedAt: data.updatedAt,
  }
}

function dataToProfileListResult(data: AuthUsersInstance): ProfilesListInterface {
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

function dataToSimpleProfileListResult(data: AuthUsersInstance): SimpleProfilesListInterface {
  return {
    id: data.id,
    name: data.profile.name,
    avatar: data.profile.avatar,
  }
}

export async function getAll(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.AuthUsers.findAll({
      where: {
        tenant: user.tenant,
        id: {
          [Op.not]: user.id
        },
      }, include: ["profile", "roles"]
    });
    const resultData = [] as ProfilesListInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToProfileListResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getOne(req, res): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.AuthUsers.findOne({
      where: {
        tenant: user.tenant, id,
      }, include: ["profile", "roles"]
    });
    ;
    return res.status(200).send(dataToProfileListResult(data));
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
    const invite = await database.Members.findOne({ where: { tenantId, code } });
    if (!invite) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await database.AuthUsers.create({
      email: invite.email,
      password: bcrypt.hashSync(req.body.password, 8),
      tenant: tenantId,
      active: true
    }
    );
    const role = await database.AuthRoles.findOne({ where: { name: "User" } })
    user.addRole(role);
    await database.Profiles.create({
      name: invite.name,
      email: invite.email,
      userId: user.id
    });
    const mainUser = database.AuthUsers.findOne({ where: { id: invite.userId }, include: "subscription" })
    await database.Subscriptions.create({
      reason: (await mainUser).subscription.reason,
      frequency: (await mainUser).subscription.frequency,
      frequencyType: (await mainUser).subscription.frequencyType,
      transactionAmount: (await mainUser).subscription.transactionAmount,
      status: true,
      type: (await mainUser).subscription.type,
      planId: (await mainUser).subscription.planId,
      userId: user.id,
    });
    await invite.destroy();
    await invite.save();
    return res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getList(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.AuthUsers.findAll({
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
    const resultData = [] as SimpleProfilesListInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToSimpleProfileListResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getInvites(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Members.findAll({
      where: { tenantId: user.tenant }
    });
    const resultData = [] as MembersInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToPeopleResult(d)));
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
    return res.status(200).send({ ...dataToPeopleResult(data), code: data.code });
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
    const user = await database.AuthUsers.findOne({ where: { id: req.userId }, include: ["profile", "subscription"] });
    if (user.subscription.type !== "professional") {
      const countPeoples = await database.Members.count({ where: { tenantId: user.tenant } });
      const countUsers = await database.AuthUsers.count({
        where: {
          tenant: user.tenant,
          id: {
            [Op.not]: user.id
          },
        }
      });
      if (countPeoples > 0 || countUsers > 0) return res.status(401).send({ message: "Plano sem permissão!" });
    }
    const seeEmail = await database.Members.findOne({ where: { email: body.email } });
    if (seeEmail) return res.status(401).send({ message: "Convite já criado, tente enviar novamente!" });
    const people = {
      name: body.name,
      email: body.email,
      code: Math.random().toString().substring(2, 8),
      userId: user.id,
      tenantId: user.tenant
    }
    const data = await database.Members.create(people);
    await InvitationEmail({ ...people, user: user.profile.name });
    return res.status(201).send(dataToPeopleResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function sendInvite(req, res): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId }, include: "profile" });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
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
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    await database.Members.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
