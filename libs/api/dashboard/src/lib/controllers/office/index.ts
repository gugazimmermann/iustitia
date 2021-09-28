import { Response } from "express";
import { UserRequest } from "@iustitia/api/auth";
import { validateEmail } from '@iustitia/site/shared-utils';
import { database, OfficeInstance, UserInstance } from '@iustitia/api/database';

export const moduleName = "office";

export const userDB = database.User;
const moduleDB = database.Office;
type ModuleInstance = OfficeInstance;

interface SimpleUserInterface {
  id: string;
  name: string;
  avatar: string;
}
interface ModuleInterface {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  zip?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  active?: boolean;
  tenantId?: string;
  managersOffice?: SimpleUserInterface[];
  usersOffice?: SimpleUserInterface[];
}

function userDataToResult(data: UserInstance): SimpleUserInterface {
  return {
    id: data.id,
    name: data.profile.name,
    avatar: data.profile.avatar,
  }
}

function dataToResult(data: ModuleInstance): ModuleInterface {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    zip: data.zip,
    address: data.address,
    number: data.number,
    complement: data.complement,
    neighborhood: data.neighborhood,
    city: data.city,
    state: data.state,
    active: data.active,
    managersOffice: (data.managersOffice) && data.managersOffice.map(m => userDataToResult(m)),
    usersOffice: (data.usersOffice) && data.usersOffice.map(u => userDataToResult(u))
  }
}

export async function count(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await moduleDB.count({ where: { tenantId } });
    return res.status(200).send({ offices: data });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getOne(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await moduleDB.findOne({
      where: { id }, include: [

        {
          association: "managersOffice",
          as: "managers",
          attributes: ['id'],
          where: { active: true },
          required: false,
          include: [
            {
              model: database.Profile,
              attributes: ['id', 'avatar', 'name'],
            },
          ],
        },
        {
          association: "usersOffice",
          as: "users",
          attributes: ['id'],
          where: { active: true },
          required: false,
          include: [
            {
              model: database.Profile,
              attributes: ['id', 'avatar', 'name'],
            },
          ],
        },
      ],
    });
    return res.status(200).send(dataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getAll(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await moduleDB.findAll({
      where: { tenantId },
      attributes: ['id', 'name', 'city', 'state', 'active'],
      include: [

        {
          association: "managersOffice",
          as: "managers",
          attributes: ['id'],
          where: { active: true },
          required: false,
          include: [
            {
              model: database.Profile,
              attributes: ['id', 'avatar', 'name'],
            },
          ],
        },
        {
          association: "usersOffice",
          as: "users",
          attributes: ['id'],
          where: { active: true },
          required: false,
          include: [
            {
              model: database.Profile,
              attributes: ['id', 'avatar', 'name'],
            },
          ],
        },
      ],
    });
    const resultData = [] as ModuleInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToResult(d)));
    console.log("resultData", JSON.stringify(resultData, undefined, 2))
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function create(req: UserRequest, res: Response): Promise<Response> {
  const { body } = req;
  if (!body.name || !body.zip || !body.address || !body.neighborhood || !body.city || !body.state || !body.tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await moduleDB.create({ ...body, active: true });
    return res.status(201).send(dataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function update(req: UserRequest, res: Response): Promise<Response> {
  const { body } = req;
  if (!body.id || !body.name || !body.zip || !body.address || !body.neighborhood || !body.city || !body.state) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await moduleDB.findByPk(body.id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    data.update(body);
    return res.status(200).send(dataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteOne(req: UserRequest, res: Response): Promise<Response> {
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
