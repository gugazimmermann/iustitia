import { Response } from "express";
import * as AWS from 'aws-sdk';
import * as sharp from 'sharp';
import { validateEmail } from '@iustitia/site/shared-utils';
import { AttachmentFileInterface, BusinessContactsCompaniesInterface, BusinessContactsPersonsInterface, UserRequest } from "@iustitia/interfaces";
import {  BusinessContactsCompaniesInstance, BusinessContactsPersonsInstance, database } from "@iustitia/api/database";
import { sitemodule } from "../..";

const S3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.NX_ACCESS_KEY_ID,
  secretAccessKey: process.env.NX_SECRET_ACCESS_KEY,
  region: "us-east-1"
});

function dataToPersonsResult(data: BusinessContactsPersonsInstance): BusinessContactsPersonsInterface {
  return {
    id: data.id,
    userId: data.userId,
    officeId: data.officeId,
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

function dataToCompaniesResult(data: BusinessContactsCompaniesInstance): BusinessContactsCompaniesInterface {
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
  return `${tenantId}/${sitemodule.name}/${id.split("-").join("")}${now}.jpeg`
}

async function sendAvatar(file: AttachmentFileInterface, fileName: string): Promise<AWS.S3.ManagedUpload.SendData> {
  const avatarFile = await sharp(file.buffer).resize(240, 240).jpeg({ quality: 90, mozjpeg: true }).toBuffer()
  const params = {
    Bucket: process.env.NX_BUCKET_AVATAR,
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

export async function getOnePerson(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.BusinessContactsPersons.findOne({
      where: { id },
      include: ["company"]
    });
    return res.status(200).send(dataToPersonsResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getAllPersons(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.BusinessContactsPersons.findAll({ where: { tenantId } });
    const resultData = [] as BusinessContactsPersonsInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToPersonsResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createPerson(req: UserRequest, res: Response): Promise<Response> {
  const { body } = req;
  if (!body.type || !body.name || !body.tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.type === "Personal") body.userId = req.userId;
  if (body.type !== "All" && body.type !== "Personal") body.officeId = body.type;
  try {
    for (const key in body) if (body[key] === "") body[key] = null;
    const data = await database.BusinessContactsPersons.create(body);
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

export async function updatePerson(req: UserRequest, res: Response): Promise<Response> {
  const { body } = req;
  if (!body.id || !body.type || !body.name) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.type === "All") {
    body.userId = null;
    body.officeId = null;
  }
  if (body.type === "Personal") {
    body.userId = req.userId;
    body.officeId = null;
  }
  if (body.type !== "All" && body.type !== "Personal") {
    body.userId = null;
    body.officeId = body.type;
  }
  try {
    const data = await database.BusinessContactsPersons.findByPk(body.id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    for (const key in body) if (body[key] === "") body[key] = null;
    data.update(body);
    if (req.file) {
      if (data.avatar) await deleteFromBucket(data.avatar, process.env.NX_BUCKET_AVATAR)
      const fileName = avatarName(data.id, data.tenantId);
      await sendAvatar(req.file, fileName);
      data.update({ avatar: fileName });
    }
    return res.status(200).send(dataToPersonsResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteOnePerson(req: UserRequest, res: Response): Promise<Response> {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.BusinessContactsPersons.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    if (data.avatar) await deleteFromBucket(data.avatar, process.env.NX_BUCKET_AVATAR)
    await database.Notes.destroy({ where: { ownerId: id } });
    const attachments = await database.Attachments.findAll({ where: { ownerId: id } });
    if (attachments) {
      for (const attachment of attachments) {
        await deleteFromBucket(attachment.link, process.env.NX_BUCKET_FILES)
        await database.Attachments.destroy({ where: { id: attachment.id } });
      }
    }
    await database.BusinessContactsPersons.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getOneCompany(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId, id } = req.params;
  if (!tenantId || !id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.BusinessContactsCompanies.findByPk(id);
    const contacts = await database.BusinessContactsPersons.findAll({ where: { companyId: data.id } });
    data.contacts = [];
    contacts.forEach(c =>
      data.contacts.push({ id: c.id, name: c.name, position: c.position })
    )
    return res.status(200).send(dataToCompaniesResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getAllCompanies(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.BusinessContactsCompanies.findAll({ where: { tenantId } });
    const resultData = [] as BusinessContactsCompaniesInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToCompaniesResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createCompany(req: UserRequest, res: Response): Promise<Response> {
  const { body } = req;
  if (!body.name || !body.tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.BusinessContactsCompanies.create(body);
    return res.status(201).send(dataToCompaniesResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function updateCompany(req: UserRequest, res: Response): Promise<Response> {
  const { body } = req;
  if (!body.id || !body.name) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.BusinessContactsCompanies.findByPk(body.id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    data.update(body);
    return res.status(200).send(dataToCompaniesResult(data));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteOneCompany(req: UserRequest, res: Response): Promise<Response> {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.BusinessContactsCompanies.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    await database.BusinessContactsCompanies.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Registro deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}