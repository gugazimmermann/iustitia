import { Response } from "express";
import { database, PlacesInstance, UsersInstance, PersonsInstance } from '@iustitia/api/database';
import { validateEmail } from '@iustitia/site/shared-utils';

export interface ProfilesListInterface {
  id: string;
  name: string;
  avatar: string;
}

export function userDataToResult(data: UsersInstance): ProfilesListInterface {
  return {
    id: data.id,
    name: data?.profile?.name || "",
    avatar: data?.profile?.avatar || "",
  }
}

function personDataToResult(data: PersonsInstance): ProfilesListInterface {
  return {
    id: data.id,
    name: data?.name || "",
    avatar: data?.avatar || "",
  }
}

export interface PlacesInterface {
  id: string;
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
  active?: boolean;
  tenantId?: string;
  managersPlace?: ProfilesListInterface[];
  employeesPlace?: ProfilesListInterface[];
  clientsPlace?: ProfilesListInterface[];
  supliersPlace?: ProfilesListInterface[];
  contactsPlace?: ProfilesListInterface[];
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
    managersPlace: (data.managersPlace) && data.managersPlace.map(m => userDataToResult(m)),
    employeesPlace: (data.employeesPlace) && data.employeesPlace.map(u => userDataToResult(u)),
    clientsPlace: (data.clientsPlace) && data.clientsPlace.map(p => personDataToResult(p)),
    supliersPlace: (data.supliersPlace) && data.supliersPlace.map(p => personDataToResult(p)),
    contactsPlace: (data.contactsPlace) && data.contactsPlace.map(p => personDataToResult(p)),
  }
}

async function findPlaceById(id: string): Promise<PlacesInstance | Error | null> {
  try {
    return await database.Places.findOne({
      where: { id },
      include: [
        {
          association: "managersPlace",
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
          association: "employeesPlace",
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
          association: "clientsPlace",
          attributes: ['id', 'avatar', 'name'],
        },
        {
          association: "supliersPlace",
          attributes: ['id', 'avatar', 'name'],
        },
        {
          association: "contactsPlace",
          attributes: ['id', 'avatar', 'name'],
        },
      ],
    });
  } catch (err) {
    return err;
  }
}

export async function getAll(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Places.findAll({
      where: { tenantId },
      attributes: ['id', 'name', 'city', 'state', 'active'],
      include: [
        {
          association: "managersPlace",
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
          association: "employeesPlace",
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
          association: "clientsPlace",
          attributes: ['id', 'avatar', 'name'],
        },
        {
          association: "supliersPlace",
          attributes: ['id', 'avatar', 'name'],
        },
        {
          association: "contactsPlace",
          attributes: ['id', 'avatar', 'name'],
        },
      ],
    });
    const resultData = [] as PlacesInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: err.message });
  }
}

export async function getOne(req, res): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await findPlaceById(id)
    return res.status(200).send(dataToResult(data as PlacesInstance));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function create(req, res): Promise<Response> {
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

export async function update(req, res): Promise<Response> {
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

export async function deleteOne(req, res): Promise<Response> {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Places.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    await database.Places.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function count(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Places.count({ where: { tenantId } });
    return res.status(200).send({ places: data });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function active(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  const { body } = req;
  if (!body.placeId || typeof body.active !== "boolean") return res.status(400).send({ message: "Dados inválidos!" });
  const user = await database.Users.findOne({ where: { id: req.userId } });
  if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
  try {
    const data = await database.Places.findByPk(body.placeId);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    data.active = body.active;
    await data.update(body);
    const savedPlace = (await findPlaceById(data.id as string)) as PlacesInstance;
    return res.status(200).send(dataToResult(savedPlace));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function managers(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  const { body } = req;
  if (!body.placeId || !body.managersList) return res.status(400).send({ message: "Dados inválidos!" });
  const user = await database.Users.findOne({ where: { id: req.userId } });
  if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
  try {
    const place = (await findPlaceById(body.placeId as string)) as PlacesInstance;
    if (!place) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    if (place.managersPlace) {
      const exintingIds: string[] = place.managersPlace.map((m) => m.id)
      if (place.removeManagersPlace) await place.removeManagersPlace(exintingIds);
    }
    const userIds: string[] = body.managersList.map((m: ProfilesListInterface) => m.id)
    if (userIds && place.addManagersPlace) await place.addManagersPlace(userIds)
    const savedPlace = (await findPlaceById(place.id as string)) as PlacesInstance;
    return res.status(200).send(dataToResult(savedPlace));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function users(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  const { body } = req;
  if (!body.placeId || !body.usersList) return res.status(400).send({ message: "Dados inválidos!" });
  const user = await database.Users.findOne({ where: { id: req.userId } });
  if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
  try {
    const place = (await findPlaceById(body.placeId as string)) as PlacesInstance;
    if (!place) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    if (place.employeesPlace) {
      const exintingIds: string[] = place.employeesPlace.map((u) => u.id)
      if (place.removeEmployeesPlace) await place.removeEmployeesPlace(exintingIds);
    }
    const userIds: string[] = body.usersList.map((u: ProfilesListInterface) => u.id)
    if (userIds && place.addEmployeesPlace) await place.addEmployeesPlace(userIds)
    const savedPlace = (await findPlaceById(place.id as string)) as PlacesInstance;
    return res.status(200).send(dataToResult(savedPlace));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
