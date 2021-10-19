import { Response } from "express";
import * as AWS from 'aws-sdk';
import sharp from 'sharp';
import { validateEmail } from '@iustitia/site/shared-utils';
import { database, PersonsInstance, CompaniesInstance } from "@iustitia/api/database";
import { ModulesEnum } from "@iustitia/modules";

const S3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.NX_ACCESS_KEY_ID,
  secretAccessKey: process.env.NX_SECRET_ACCESS_KEY,
  region: "us-east-1"
});

export type PersonsTypes = "Clientes" | "Contatos" | "Fornecedores";

export type OnwersListType = {
  id: string;
  name: string;
  type: "person" | "place";
}

export interface PersonsInterface {
  id?: string;
  type?: PersonsTypes;
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
  tenantId?: string;
  onwers?: OnwersListType[];
}

function dataToPersonsResult(data: PersonsInstance): PersonsInterface {
  const onwers: OnwersListType[] = [];
  if (data.type === "Clientes") {
    if (data.userClients) data.userClients.forEach(u => onwers.push({ id: u.id, name: u?.profile?.name || "", type: "person" }));
    if (data.placeClients) data.placeClients.forEach(p => onwers.push({ id: p.id, name: p.name, type: "place" }));
  }
  if (data.type === "Contatos") {
    if (data.userContacts) data.userContacts.forEach(u => onwers.push({ id: u.id, name: u?.profile?.name || "", type: "person" }));
    if (data.placeContacts) data.placeContacts.forEach(p => onwers.push({ id: p.id, name: p.name, type: "place" }));
  }
  if (data.type === "Fornecedores") {
    if (data.userSupliers) data.userSupliers.forEach(u => onwers.push({ id: u.id, name: u?.profile?.name || "", type: "person" }));
    if (data.placeSupliers) data.placeSupliers.forEach(p => onwers.push({ id: p.id, name: p.name, type: "place" }));
  }
  return {
    id: data.id,
    type: data.type as PersonsTypes,
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
    onwers: onwers
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

const includeOwners = [
  {
    association: "company",
    attributes: ['name'],
  },
  {
    association: "userClients",
    attributes: ['id'],
    where: { active: true },
    required: false,
    include: [
      {
        model: database.Profiles,
        attributes: ['name'],
      },
    ],
  },
  {
    association: "userSupliers",
    attributes: ['id'],
    where: { active: true },
    required: false,
    include: [
      {
        model: database.Profiles,
        attributes: ['name'],
      },
    ],
  },
  {
    association: "userContacts",
    attributes: ['id'],
    where: { active: true },
    required: false,
    include: [
      {
        model: database.Profiles,
        attributes: ['name'],
      },
    ],
  },
  {
    association: "placeClients",
    attributes: ['id', 'name'],
  },
  {
    association: "placeSupliers",
    attributes: ['id', 'name'],
  },
  {
    association: "placeContacts",
    attributes: ['id', 'name'],
  },
];

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
      include: includeOwners
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
    const data = await database.Persons.findAll({
      where: { type, tenantId },
      attributes: ['id', 'type', 'avatar', 'name', 'phone', 'email', 'city', 'state'],
      include: includeOwners
    });
    const resultData = [] as PersonsInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToPersonsResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function changePersonOwner(req, res): Promise<Response> {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  const { body } = req;
  if (!body.owners) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await await database.Persons.findOne({ where: { id }, include: includeOwners });
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    const user = await database.Users.findOne({ where: { id: req.userId } });
    if (!user || user.tenant !== data.tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const userIds: string[] = body.owners.filter((o: OnwersListType) => o.type === "person").map((x: OnwersListType) => x.id)
    const placeIds: string[] = body.owners.filter((o: OnwersListType) => o.type === "place").map((x: OnwersListType) => x.id)
    if (data.type === "Clientes") {
      if (data.getUserClients && data.removeUserClients && data.getPlaceClients && data.removePlaceClients) {
        const currentUsers = await data.getUserClients();
        await data.removeUserClients(currentUsers);
        const currentPlaces = await data.getPlaceClients();
        await data.removePlaceClients(currentPlaces);
      }
      if (userIds && data.addUserClients) await data.addUserClients(userIds)
      if (placeIds && data.addPlaceClients) await data.addPlaceClients(placeIds)
    }
    if (data.type === "Contatos") {
      if (data.getUserContacts && data.removeUserContacts && data.getPlaceContacts && data.removePlaceContacts) {
        const currentUsers = await data.getUserContacts();
        await data.removeUserContacts(currentUsers);
        const currentPlaces = await data.getPlaceContacts();
        await data.removePlaceContacts(currentPlaces);
      }
      if (userIds && data.addUserContacts) await data.addUserContacts(userIds)
      if (placeIds && data.addPlaceClients) await data.addPlaceClients(placeIds)
    }
    if (data.type === "Fornecedores") {
      if (data.getUserSupliers && data.removeUserSupliers && data.getPlaceSupliers && data.removePlaceSupliers) {
        const currentUsers = await data.getUserSupliers();
        await data.removeUserSupliers(currentUsers);
        const currentPlaces = await data.getPlaceSupliers();
        await data.removePlaceSupliers(currentPlaces);
      }
      if (userIds && data.addUserSupliers) await data.addUserSupliers(userIds)
      if (placeIds && data.addPlaceClients) await data.addPlaceClients(placeIds)
    }
    const savedPlace = (await database.Persons.findOne({ where: { id }, include: includeOwners })) as PersonsInstance;
    return res.status(200).send(dataToPersonsResult(savedPlace));
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: err.message });
  }
}

export async function createPerson(req, res): Promise<Response> {
  const { body } = req;
  if (!body.type || !body.name || !body.tenantId) return res.status(400).send({ message: "Dados inválidos!" });
  if (body.email && !validateEmail(body.email)) return res.status(400).send({ message: "Dados inválidos!" });
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
