import { Response } from "express";
import * as AWS from 'aws-sdk';
import sharp from 'sharp';
import { validateEmail } from '@iustitia/site/shared-utils';
import { CompaniesInstance, PersonsInstance, database } from "@iustitia/api/database";
import { ModulesEnum } from "@iustitia/modules";

const S3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.NX_ACCESS_KEY_ID,
  secretAccessKey: process.env.NX_SECRET_ACCESS_KEY,
  region: "us-east-1"
});

export interface PersonsInterface {
  id?: string;
  type?: string;
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
  position?: string;
  companyId?: string;
  company?: string;
  comments?: string;
  owner?: string;
  userId?: string;
  placeId?: string;
  tenantId?: string;
}

function dataToPersonsResult(data: PersonsInstance): PersonsInterface {
  return {
    id: data.id,
    userId: data.userId,
    placeId: data.placeId,
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
    position: data.position,
    companyId: data.companyId,
    company: data.company?.name,
    comments: data.comments,
  }
}

export interface CompaniesInterface {
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

function dataToCompaniesResult(data: CompaniesInstance): CompaniesInterface {
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

function avatarName(id: string, tenantId: string): string {
  const d = new Date();
  const now = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`
  return `${tenantId}/${ModulesEnum.businessContacts}/${id.split("-").join("")}${now}.jpeg`
}

export interface AttachmentFileInterface extends File {
  originalname: string;
  buffer: Buffer;
}

async function sendAvatar(file: AttachmentFileInterface, fileName: string): Promise<AWS.S3.ManagedUpload.SendData> {
  const avatarFile = await sharp(file.buffer).resize(240, 240).jpeg({ quality: 90, mozjpeg: true }).toBuffer()
  const params = {
    Bucket: process.env.NX_BUCKET_AVATAR as string,
    Key: fileName,
    Body: avatarFile
  };
  const res = await S3.upload(params).promise();
  return res;
}

export async function deleteFromBucket(fileName: string, bucket: string): Promise<void> {
  const params = {
    Bucket: bucket,
    Key: fileName
  }
  const currentObject = await S3.headObject(params).promise().then(() => true, err => {
    if (err.code === 'NotFound') return false;
    throw err;
  });
  if (currentObject) {
    await S3.deleteObject(params).promise();
  }
}

export async function getOnePerson(req, res): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Persons.findOne({
      where: { id },
      include: ["company"]
    });
    return res.status(200).send(dataToPersonsResult(data as PersonsInstance));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getAllPersons(req, res): Promise<Response> {
  const { tenantId, type } = req.params;
  if (!tenantId || !type) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Persons.findAll({ where: { type, tenantId } });
    const resultData = [] as PersonsInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToPersonsResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createPerson(req, res): Promise<Response> {
  const { body } = req;
  if (!body.type || !body.name || !body.tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.type === "Personal") body.userId = req.userId;
  if (body.type !== "All" && body.type !== "Personal") body.placeId = body.type;
  try {
    for (const key in body) if (body[key] === "") body[key] = null;
    const data = await database.Persons.create(body);
    if (req.file) {
      const fileName = avatarName(data.id, data.tenantId);
      await sendAvatar(req.file, fileName);
      data.update({ avatar: fileName });
    }
    return res.status(201).send(dataToPersonsResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function updatePerson(req, res): Promise<Response> {
  const { body } = req;
  if (!body.id || !body.type || !body.name) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.type === "All") {
    body.userId = null;
    body.placeId = null;
  }
  if (body.type === "Personal") {
    body.userId = req.userId;
    body.placeId = null;
  }
  if (body.type !== "All" && body.type !== "Personal") {
    body.userId = null;
    body.placeId = body.type;
  }
  try {
    const data = await database.Persons.findByPk(body.id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    for (const key in body) if (body[key] === "") body[key] = null;
    data.update(body);
    if (req.file) {
      if (data.avatar) await deleteFromBucket(data.avatar, process.env.NX_BUCKET_AVATAR as string)
      const fileName = avatarName(data.id, data.tenantId);
      await sendAvatar(req.file, fileName);
      data.update({ avatar: fileName });
    }
    return res.status(200).send(dataToPersonsResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteOnePerson(req, res): Promise<Response> {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Persons.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    if (data.avatar) await deleteFromBucket(data.avatar, process.env.NX_BUCKET_AVATAR as string)
    await database.Notes.destroy({ where: { ownerId: id } });
    const attachments = await database.Attachments.findAll({ where: { ownerId: id } });
    if (attachments) {
      for (const attachment of attachments) {
        await deleteFromBucket(attachment.link, process.env.NX_BUCKET_FILES as string)
        await database.Attachments.destroy({ where: { id: attachment.id } });
      }
    }
    await database.Persons.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getOneCompany(req, res): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Companies.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const contacts = await database.Persons.findAll({ where: { companyId: data.id } });
    data.contacts = [];
    contacts.forEach(c =>
      data.contacts.push({ id: c.id, name: c.name, position: c.position })
    )
    return res.status(200).send(dataToCompaniesResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getAllCompanies(req, res): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Companies.findAll({ where: { tenantId } });
    const resultData = [] as CompaniesInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToCompaniesResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createCompany(req, res): Promise<Response> {
  const { body } = req;
  if (!body.name || !body.tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Companies.create(body);
    return res.status(201).send(dataToCompaniesResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function updateCompany(req, res): Promise<Response> {
  const { body } = req;
  if (!body.id || !body.name) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Companies.findByPk(body.id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    data.update(body);
    return res.status(200).send(dataToCompaniesResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteOneCompany(req, res): Promise<Response> {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Companies.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    await database.Companies.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
