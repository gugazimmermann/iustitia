import { Op } from "sequelize";
import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import { UserRequest } from "@iustitia/api/auth";
import { validateEmail } from '@iustitia/site/shared-utils';
import { database, PeopleInstance, ProfileInstance, UserInstance } from '@iustitia/api/database';
import { InvitationEmail } from "@iustitia/api/email";

const userDB = database.User;
const moduleDB = database.People;
const profileDB = database.Profile;
type ModuleInstance = PeopleInstance;

interface ModuleInterface {
  id?: string;
  name: string;
  email: string;
  code?: string;
  tenantId?: string;
  updatedAt?: Date;
}

function dataToPeopleResult(data: ModuleInstance): ModuleInterface {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    updatedAt: data.updatedAt,
  }
}

interface ProfileInterface {
  id?: string;
  role?: string;
  avatar?: string;
  name: string;
  email?: string;
  phone?: string;
  zip?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

function dataToProfileResult(id: string, data: ProfileInstance, roles: { name: string }[]): ProfileInterface {
  return {
    id: data.id,
    role: roles[0].name,
    avatar: data.avatar,
    name: data.name,
    email: data.email,
    phone: data.phone,
    zip: data.zip,
    address: data.address,
    number: data.number,
    complement: data.complement,
    neighborhood: data.neighborhood,
    city: data.city,
    state: data.state
  }
}

export async function getAll(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await userDB.findAll({
      where: {
        tenant: user.tenant,
        id: {
          [Op.not]: user.id
        },
      }, include: ["profile", "roles"]
    });
    const resultData = [] as ProfileInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToProfileResult(d.id, d.profile, d.roles)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getInvites(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await moduleDB.findAll({
      where: { tenantId: user.tenant }
    });
    const resultData = [] as ProfileInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToPeopleResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createInvite(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  const { body } = req;
  if (!body.name || !body.email || !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId }, include: ["profile", "subscription"] });
    if (user.subscription.type !== "professional") {
      const countPeoples = await database.People.count({ where: { tenantId: user.tenant } });
      const countUsers = await database.User.count({
        where: {
          tenant: user.tenant,
          id: {
            [Op.not]: user.id
          },
        }
      });
      if (countPeoples > 0 || countUsers > 0) return res.status(401).send({ message: "Plano sem permissão!" });
    }
    const people = {
      name: body.name,
      email: body.email,
      code: Math.random().toString().substring(2, 8),
      userId: user.id,
      tenantId: user.tenant
    }
    const data = await moduleDB.create(people);
    await InvitationEmail({ ...people, user: user.profile.name });
    return res.status(201).send(dataToPeopleResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function sendInvite(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId }, include: "profile" });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const invite = await moduleDB.findOne({ where: { id: id } });
    if (!invite) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const profile = await profileDB.findOne({ where: { email: invite.email } });
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

export async function deleteInvite(req: UserRequest, res: Response): Promise<Response> {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await moduleDB.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    await moduleDB.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getInviteCode(req: Request, res: Response): Promise<Response> {
  const { tenantId, code } = req.params;
  if (!tenantId || !code) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await moduleDB.findOne({ where: { tenantId: tenantId, code: code } });
    return res.status(200).send({ ...dataToPeopleResult(data), code: data.code });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createUser(req: Request, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  const { code, password } = req.body;
  if (!code || !password) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    console.log(tenantId, code)
    const invite = await moduleDB.findOne({ where: { tenantId, code } });
    if (!invite) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await database.User.create({
      email: invite.email,
      password: bcrypt.hashSync(req.body.password, 8),
      tenant: tenantId,
      active: true
    }
    );
    const role = await database.Role.findOne({ where: { name: "User" } })
    user.addRole(role);
    await database.Profile.create({
      name: invite.name,
      email: invite.email,
      userId: user.id
    });
    const mainUser = userDB.findOne({ where: { id: invite.userId }, include: "subscription" })
    await database.Subscription.create({
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

// used in offices to select users and managers
interface SimpleUserInterface {
  id: string;
  name: string;
  avatar: string;
}

function userDataToResult(data: UserInstance): SimpleUserInterface {
  return {
    id: data.id,
    name: data.profile.name,
    avatar: data.profile.avatar,
  }
}

export async function getList(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await userDB.findAll({
      where:
      {
        tenant: user.tenant,
        active: true
      },
      attributes: ['id'],
      include: [
        {
          model: database.Profile,
          attributes: ['id', 'avatar', 'name'],
        },
      ],
      order: [[database.Profile, 'name', 'ASC']],
    });
    const resultData = [] as SimpleUserInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(userDataToResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
