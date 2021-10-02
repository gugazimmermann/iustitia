import { Response } from "express";
import * as AWS from 'aws-sdk';
import { DateTime } from "luxon";
import { AttachmentsInterface } from "@iustitia/interfaces";
import { AttachmentsInstance, database } from "@iustitia/api/database";
import { attchmentPath } from "../Attachments";

const S3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.NX_ACCESS_KEY_ID,
  secretAccessKey: process.env.NX_SECRET_ACCESS_KEY,
  region: "us-east-1"
});

function dataToResult(data: AttachmentsInstance): AttachmentsInterface {
  return {
    id: data.id,
    date: DateTime.fromJSDate(data.createdAt).toFormat("dd/MM/yyyy HH:mm"),
    name: data.name,
    link: data.link
  }
}

function attchmentName(tenant: string, ownertId: string, originalname: string): string {
  const d = new Date();
  const now = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`
  return `${tenant}/${attchmentPath}/${ownertId.split("-").join("")}/${originalname}_${now}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendAttchment(file: any, fileName: string): Promise<AWS.S3.ManagedUpload.SendData> {
  const params = {
    Bucket: process.env.NX_BUCKET_FILES,
    Key: fileName,
    Body: file.buffer
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

export async function getAll(req, res): Promise<Response> {
  const { tenantId, ownerId } = req.params;
  if (!tenantId || !ownerId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await database.Attachments.findAll({ where: { ownerId }, order: [['createdAt', 'DESC']] });
    const resultData = [] as AttachmentsInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(dataToResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function create(req, res): Promise<Response> {
  const { body } = req;
  if (!body.ownerId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileName = attchmentName(user.tenant, body.ownerId, file.originalname);
        await sendAttchment(file, fileName);
        await database.Attachments.create({
          name: file.originalname,
          link: fileName,
          ownerId: body.ownerId
        });
      }
    }
    return res.status(201).send({ message: "Anexos salvos!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteOne(req, res): Promise<Response> {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await database.Attachments.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    await deleteFromBucket(data.link, process.env.NX_BUCKET_FILES)
    await database.Attachments.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Anexo deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
