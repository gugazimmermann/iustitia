import * as AWS from 'aws-sdk';
import * as sharp from 'sharp';
import { database, ContactInstance } from '@iustitia/api/database';
import { validateEmail } from '@iustitia/site/shared-utils';
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.NX_ACCESS_KEY_ID,
  secretAccessKey: process.env.NX_SECRET_ACCESS_KEY,
  region: "us-east-1"
})

const moduleDB = database.Contact;

interface ContactInterface {
  id?: string;
  avatar?: string;
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
  description?: string;
  tenantId?: string;
}

function dataToResult(data: ContactInstance): ContactInterface {
  return {
    id: data.id,
    avatar: data.avatar,
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
    description: data.description,
  }
}

function avatarName(id: string, tenantId: string) {
  const d = new Date();
  const now = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`
  return `${tenantId}/contacts/${id.split("-").join("")}${now}.jpeg`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendAvatar(file: any, fileName: string) {
  const avatarFile = await sharp(file.buffer).resize(240, 240).jpeg({ quality: 90, mozjpeg: true }).toBuffer()
  const params = {
    Bucket: process.env.NX_BUCKET_AVATAR,
    Key: fileName,
    Body: avatarFile
  };
  await s3.upload(params).promise();
  return fileName;
}

async function deleteExistingAvatar(fileName: string) {
  const currentObject = {
    Bucket: process.env.NX_BUCKET_AVATAR,
    Key: fileName
  }
  const currentAvatar = await s3.headObject(currentObject).promise().then(() => true, err => {
    if (err.code === 'NotFound') return false;
    throw err;
  });
  if (currentAvatar) {
    await s3.deleteObject(currentObject).promise();
  }
}

export async function getOne(req, res) {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.User.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await moduleDB.findByPk(id);
    return res.status(200).send(dataToResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getAll(req, res) {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.User.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
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
  if (!body.name || !body.tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  body.userId = req.userId
  try {
    const data = await moduleDB.create(body);
    if (req.file) {
      const fileName = avatarName(data.id, data.tenantId);
      await sendAvatar(req.file, fileName);
      data.update({ avatar: fileName });
    }
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
    if (req.file) {
      if (data.avatar) await deleteExistingAvatar(data.avatar)
      const fileName = avatarName(data.id, data.tenantId);
      await sendAvatar(req.file, fileName);
      data.update({ avatar: fileName });
    }
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
    const user = await database.User.findOne({ where: { id: req.userId } });
    if (user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    if (data.avatar) await deleteExistingAvatar(data.avatar)
    await moduleDB.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createAttachments(req, res) {
  const { body } = req;
  if (!body.contactId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.User.findOne({ where: { id: req.userId } });
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileName = `${user.tenant}/contacts/${body.contactId.split("-").join("")}/${file.fileName}`
        console.log(fileName)
      }
    }
    return res.status(2000).send({ message: "ok" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
