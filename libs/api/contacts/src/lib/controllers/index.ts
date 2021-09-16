import { database, ContactInstance } from '@iustitia/api/database';
import { validateEmail } from '@iustitia/site/shared-utils';

const moduleDB = database.Contact;

export interface ContactInterface {
  id: string;
  avatar: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  zip: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

function dataToResult(data: ContactInstance): ContactInterface {
  return {
    id: data.id,
    avatar: data.avatar,
    name: data.name,
    company: data.company,
    position: data.position,
    email: data.email,
    phone: data.phone,
    zip: data.zip,
    address: data.address,
    number: data.number,
    complement: data.complement,
    neighborhood: data.neighborhood,
    city: data.city,
    state: data.state,
  }
}

export async function getOne(req, res) {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  const user = await database.User.findOne({ where: { id: req.userId } });
  if (user.tenant !== tenantId) {
    return res.status(401).send({ message: "Sem permissão!" });
  }
  try {
    const data = await moduleDB.findByPk(id);
    return res.status(200).send(dataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getAll(req, res) {
  const { tenantId } = req.params;
  if (!tenantId) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  const user = await database.User.findOne({ where: { id: req.userId } });
  if (user.tenant !== tenantId) {
    return res.status(401).send({ message: "Sem permissão!" });
  }
  try {
    const data = await moduleDB.findAll({ where: { tenantId } });
    const resultData = [] as ContactInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function create(req, res) {
  const { body } = req;
  if (!body.name) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  if (body.email && !validateEmail(body.email)) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  body.userId = req.userId
  try {
    const data = await moduleDB.create(body);
    return res.status(201).send(dataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function update(req, res) {
  const { body } = req;
  if (!body.id || !body.name) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  if (body.email && !validateEmail(body.email)) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  try {
    const data = await moduleDB.findByPk(body.id);
    if (!data) {
      return res.status(404).send({ message: "Nenhum registro encontrado!" });
    }
    data.update(body)
    return res.status(200).send(dataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteOne(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  const data = await moduleDB.findByPk(id);
  if (!data) {
    return res.status(404).send({ message: "Nenhum registro encontrado!" });
  }
  const user = await database.User.findOne({ where: { id: req.userId } });
  if (user.tenant !== data.tenantId) {
    return res.status(401).send({ message: "Sem permissão!" });
  }
  try {
    await moduleDB.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
