import { Response } from "express";
import { database, ScheduleEventsInstance} from '@iustitia/api/database';
import { ScheduleEventsInterface, UserRequest } from "@iustitia/api/interfaces";

function dataToEventsResult(data: ScheduleEventsInstance): ScheduleEventsInterface {
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

export async function getOneEvent(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.ScheduleEvents.findByPk(id);
    return res.status(200).send(dataToEventsResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getAllEvents(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId, officeId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    let data: ScheduleEventsInstance[] = [];
    const where = !officeId ? { where: { userId: user.id } } : { where: { officeId: officeId } }
    data = await database.ScheduleEvents.findAll(where);
    const resultData = [] as ScheduleEventsInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToEventsResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createEvent(req: UserRequest, res: Response): Promise<Response> {
  const { body } = req;
  if (!body.startDate || !body.endDate || !body.fullDay || !body.color || !body.title || !body.tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.ScheduleEvents.create(body);
    return res.status(201).send(dataToEventsResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function updateEvent(req: UserRequest, res: Response): Promise<Response> {
  const { body } = req;
  if (!body.id || !body.startDate || !body.endDate || !body.fullDay || !body.color || !body.title) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.ScheduleEvents.findByPk(body.id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    data.update(body);
    return res.status(200).send(dataToEventsResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteOneEvent(req: UserRequest, res: Response): Promise<Response> {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.ScheduleEvents.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    await database.ScheduleEvents.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
