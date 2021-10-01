import { database, NotesInstance } from "@iustitia/api/database";
import { NotesInterface, UserRequest } from "@iustitia/interfaces";
import { Response } from "express";
import { DateTime } from "luxon";

function dataToResult(data: NotesInstance): NotesInterface {
  return {
    id: data.id,
    date: DateTime.fromJSDate(data.createdAt).toFormat("dd/MM/yyyy HH:mm"),
    title: data.title,
    content: data.content
  }
}

export async function getAll(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId, ownerId } = req.params;
  if (!tenantId || !ownerId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Notes.findAll({ where: { ownerId }, order: [['createdAt', 'DESC']] });
    const resultData = [] as NotesInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function create(req: UserRequest, res: Response): Promise<Response> {
  const { body } = req;
  if (!body.title || !body.content || !body.ownerId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    await database.Notes.create({
      title: body.title,
      content: body.content,
      ownerId: body.ownerId
    });
    return res.status(201).send({ message: "Nota salva!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function update(req: UserRequest, res: Response): Promise<Response> {
  const { body } = req;
  if (!body.id || !body.title || !body.content) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Notes.findByPk(body.id);
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
    const data = await database.Notes.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    await database.Notes.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Nota deletada!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
