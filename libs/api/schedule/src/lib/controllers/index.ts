import { Response } from "express";
import { database, EventsInstance} from '@iustitia/api/database';

export interface EventsInterface {
  id?: string;
  startDate?: Date;
  endDate?: Date;
  fullDay?: boolean;
  color?: string;
  title?: string;
  description?: string;
  userId?: string;
  placeId?: string;
  tenantId?: string;
}

function dataToEventsResult(data: EventsInstance): EventsInterface {
  return {
    id: data.id,
    startDate: data.startDate,
    endDate: data.endDate,
    fullDay: data.fullDay,
    color: data.color,
    title: data.title,
    description: data?.description,
  }
}

export async function getOneEvent(req, res): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Events.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nao Encontrado!" });
    return res.status(200).send(dataToEventsResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getAllEvents(req, res): Promise<Response> {
  const { tenantId, placeId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    let data: EventsInstance[] = [];
    const where = !placeId ? { where: { userId: user.id } } : { where: { placeId: placeId } }
    data = await database.Events.findAll(where);
    const resultData = [] as EventsInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToEventsResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createEvent(req, res): Promise<Response> {
  const { body } = req;
  if (!body.startDate || !body.endDate || !body.fullDay || !body.color || !body.title || !body.tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Events.create(body);
    return res.status(201).send(dataToEventsResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function updateEvent(req, res): Promise<Response> {
  const { body } = req;
  if (!body.id || !body.startDate || !body.endDate || !body.fullDay || !body.color || !body.title) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Events.findByPk(body.id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    data.update(body);
    return res.status(200).send(dataToEventsResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteOneEvent(req, res): Promise<Response> {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Events.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    await database.Events.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
