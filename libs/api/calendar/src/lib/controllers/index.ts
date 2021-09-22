import { database, EventInstance } from '@iustitia/api/database';

export const userDB = database.User;
const moduleDB = database.Event;
type ModuleInstance = EventInstance;

interface ModuleInterface {
  id?: string;
  startDate?: Date;
  endDate?: Date;
  fullDay?: boolean;
  color?: string;
  title?: string;
  description?: string;
  userId?: string;
  officeId?: string;
  tenantId?: string;
}

function dataToResult(data: ModuleInstance): ModuleInterface {
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

export async function getOne(req, res) {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await moduleDB.findByPk(id);
    return res.status(200).send(dataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getAll(req, res) {
  const { tenantId, officeId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    let data: EventInstance[] = [];
    const where = !officeId ? { where: { userId: user.id } } : { where: { officeId: officeId } }
    data = await moduleDB.findAll(where);
    const resultData = [] as ModuleInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function create(req, res) {
  const { body } = req;
  if (!body.startDate || !body.endDate || !body.fullDay || !body.color || !body.title || !body.tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await moduleDB.create(body);
    return res.status(201).send(dataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function update(req, res) {
  const { body } = req;
  if (!body.id || !body.startDate || !body.endDate || !body.fullDay || !body.color || !body.title) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await moduleDB.findByPk(body.id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    data.update(body);
    return res.status(200).send(dataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteOne(req, res) {
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
