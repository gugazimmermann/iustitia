import { Response } from "express";
import { PlacesInterface, SimpleProfileListInterface, UserRequest } from "@iustitia/interfaces";
import { AuthUsersInstance, database, PlacesInstance } from '@iustitia/api/database';
import { validateEmail } from '@iustitia/site/shared-utils';

function userDataToResult(data: AuthUsersInstance): SimpleProfileListInterface {
  return {
    id: data.id,
    name: data.profile.name,
    avatar: data.profile.avatar,
  }
}

function dataToResult(data: PlacesInstance): PlacesInterface {
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

async function findOfficeById(id: string): Promise<PlacesInstance | Error> {
  try {
    return await database.Places.findOne({
      where: { id },
      include: [
        {
          association: "managersOffice",
          attributes: ['id'],
          where: { active: true },
          required: false,
          include: [
            {
              model: database.Profiles,
              attributes: ['id', 'avatar', 'name'],
            },
          ],
        },
        {
          association: "usersOffice",
          attributes: ['id'],
          where: { active: true },
          required: false,
          include: [
            {
              model: database.Profiles,
              attributes: ['id', 'avatar', 'name'],
            },
          ],
        },
      ],
    });
  } catch (err) {
    return err;
  }
}

export async function getAll(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Places.findAll({
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
              model: database.Profiles,
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
              model: database.Profiles,
              attributes: ['id', 'avatar', 'name'],
            },
          ],
        },
      ],
    });
    const resultData = [] as PlacesInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getOne(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await findOfficeById(id)
    return res.status(200).send(dataToResult(data as PlacesInstance));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function create(req: UserRequest, res: Response): Promise<Response> {
  const { body } = req;
  if (!body.name || !body.zip || !body.address || !body.neighborhood || !body.city || !body.state || !body.tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Places.create({ ...body, active: true });
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
    const data = await database.Places.findByPk(body.id);
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
    const data = await database.Places.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    await database.Places.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function count(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Places.count({ where: { tenantId } });
    return res.status(200).send({ offices: data });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function active(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  const { body } = req;
  if (!body.officeId || typeof body.active !== "boolean") return res.status(400).send({ message: "Dados inválidos!" });
  const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
  if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
  try {
    const data = await database.Places.findByPk(body.officeId);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    data.active = body.active;
    await data.update(body);
    const savedOffice = (await findOfficeById(data.id as string)) as PlacesInstance;
    return res.status(200).send(dataToResult(savedOffice));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function managers(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  const { body } = req;
  if (!body.officeId || !body.managersList) return res.status(400).send({ message: "Dados inválidos!" });
  const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
  if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
  try {
    const office = (await findOfficeById(body.officeId as string)) as PlacesInstance;
    if (!office) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const exintingIds: string[] = office.managersOffice.map((m) => m.id)
    await office.removeManagersOffice(exintingIds);
    const userIds: string[] = body.managersList.map((m: SimpleProfileListInterface) => m.id)
    await office.addManagersOffice(userIds)
    const savedOffice = (await findOfficeById(office.id as string)) as PlacesInstance;
    return res.status(200).send(dataToResult(savedOffice));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function users(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  const { body } = req;
  if (!body.officeId || !body.usersList) return res.status(400).send({ message: "Dados inválidos!" });
  const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
  if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
  try {
    const office = (await findOfficeById(body.officeId as string)) as PlacesInstance;
    if (!office) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const exintingIds: string[] = office.usersOffice.map((u) => u.id)
    await office.removeUsersOffice(exintingIds);
    const userIds: string[] = body.usersList.map((u: SimpleProfileListInterface) => u.id)
    await office.addUsersOffice(userIds)
    const savedOffice = (await findOfficeById(office.id as string)) as PlacesInstance;
    return res.status(200).send(dataToResult(savedOffice));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
