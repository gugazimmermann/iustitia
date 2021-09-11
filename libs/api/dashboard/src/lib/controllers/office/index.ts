import { database } from '@iustitia/api/database';
import { validateEmail } from '@iustitia/site/shared-utils';


export async function getAllOffices(req, res) {
  const { tenantId } = req.params;
  if (!tenantId) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  const user = await database.User.findOne({ where: { id: req.userId } });
  if (user.tenant !== tenantId) {
    return res.status(404).send({ message: "Nenhum escritório encontrado!" });
  }
  try {
    const offices = await database.Office.findAll({ where: { tenantId } });
    return res.send(offices);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createOffice(req, res) {
  const { body } = req;
  if (
    !body.name ||
    !body.address ||
    !body.neighborhood ||
    !body.city ||
    !body.state ||
    !body.zip ||
    !body.tenantId
  ) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  if (body.email && !validateEmail(body.email)) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  body.userId = req.userId
  try {
    const office = await database.Office.create(body);
    return res.send({
      name: office.name,
      email: office.email,
      phone: office.phone,
      zip: office.zip,
      address: office.address,
      number: office.number,
      complement: office.complement,
      neighborhood: office.neighborhood,
      city: office.city,
      state: office.state,
      tenantId: office.tenantId
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function updateOffice(req, res) {
  const { body } = req;
  if (
    !body.id ||
    !body.name ||
    !body.address ||
    !body.neighborhood ||
    !body.city ||
    !body.state ||
    !body.zip
  ) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  if (body.email && !validateEmail(body.email)) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  try {
    const office = await database.Office.findByPk(body.id);
    if (!office) {
      return res.status(404).send({ message: "Nenhum escritório encontrado!" });
    }
    office.update(body)
    return res.send({
      name: office.name,
      email: office.email,
      phone: office.phone,
      zip: office.zip,
      address: office.address,
      number: office.number,
      complement: office.complement,
      neighborhood: office.neighborhood,
      city: office.city,
      state: office.state,
      tenantId: office.tenantId
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteOffice(req, res) {
  const { officeId } = req.params;
  if (!officeId) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  const office = await database.Office.findByPk(officeId);
  if (!office) {
    return res.status(404).send({ message: "Nenhum escritório encontrado!" });
  }
  const user = await database.User.findOne({ where: { id: req.userId } });
  if (user.tenant !== office.tenantId) {
    return res.status(401).send({ message: "Sem permissão para deletar o escritório!" });
  }
  try {
    await database.Office.destroy({ where: { id: officeId } });
    return res.status(200).send({ message: "Escritório deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
