import { DateTime } from "luxon";
import { moduleNotesDB, ModuleNotesInstance, userDB } from ".";

interface NotesInterface {
  id?: string;
  date?: string;
  title?: string;
  content?: string;
  ownerId?: string;
}

function noteDataToResult(data: ModuleNotesInstance): NotesInterface {
  return {
    id: data.id,
    date: DateTime.fromJSDate(data.createdAt).toFormat("dd/MM/yyyy HH:mm"),
    title: data.title,
    content: data.content
  }
}

export async function getAllNotes(req, res) {
  const { tenantId, ownerId } = req.params;
  if (!tenantId || !ownerId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await moduleNotesDB.findAll({ where: { ownerId }, order: [['createdAt', 'DESC']] });
    const resultData = [] as NotesInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(noteDataToResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createNote(req, res) {
  const { body } = req;
  if (!body.title || !body.content || !body.ownerId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    await moduleNotesDB.create({
      title: body.title,
      content: body.content,
      ownerId: body.ownerId
    });
    return res.status(201).send({ message: "Nota salva!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function updateNote(req, res) {
  const { body } = req;
  if (!body.id || !body.title || !body.content) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await moduleNotesDB.findByPk(body.id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    data.update(body);
    return res.status(200).send(noteDataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteOneNote(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await moduleNotesDB.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    await moduleNotesDB.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Nota deletada!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
