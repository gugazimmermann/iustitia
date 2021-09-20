import { validateEmail } from '@iustitia/site/shared-utils';
import { database, CompanyInstance } from '@iustitia/api/database';

export const userDB = database.User;
const moduleDB = database.Company;
type ModuleInstance = CompanyInstance;
const contactDB = database.Contact;

interface ModuleInterface {
  id?: string;
  name: string;
  site?: string;
  email?: string;
  phone?: string;
  zip?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  comments?: string;
  contacts?: {
    id: string;
    name: string;
    position: string;
  }[];
  tenantId?: string;
}

function dataToResult(data: ModuleInstance): ModuleInterface {
  return {
    id: data.id,
    name: data.name,
    site: data.site,
    email: data.email,
    phone: data.phone,
    zip: data.zip,
    address: data.address,
    number: data.number,
    complement: data.complement,
    neighborhood: data.neighborhood,
    city: data.city,
    state: data.state,
    comments: data.comments,
    contacts: data.contacts
  }
}

export async function getOne(req, res) {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await moduleDB.findByPk(id);
    const contacts = await contactDB.findAll({ where: { companyId: data.id } });
    data.contacts = [];
    contacts.forEach(c =>
      data.contacts.push({ id: c.id, name: c.name, position: c.position })
    )
    return res.status(200).send(dataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getAll(req, res) {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await moduleDB.findAll({ where: { tenantId } });
    const resultData = [] as ModuleInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function create(req, res) {
  const { body } = req;
  if (!body.name || !body.tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await moduleDB.create(body);
    return res.status(201).send(dataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function update(req, res) {
  const { body } = req;
  if (!body.id || !body.name) return res.status(400).send({ message: "Dados inválidos!" });
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
