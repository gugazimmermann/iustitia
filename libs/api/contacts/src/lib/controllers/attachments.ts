import { Response } from "express";
import * as AWS from 'aws-sdk';
import { DateTime } from "luxon";
import { moduleName } from '../Contacts';
import { deleteFromBucket, moduleAttachmentsDB, ModuleAttachmentsInstance, userDB } from '.';

interface AttachmentsInterface {
  id?: string;
  date?: string;
  name?: string;
  link?: string;
  ownerId?: string;
}

const S3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.NX_ACCESS_KEY_ID,
  secretAccessKey: process.env.NX_SECRET_ACCESS_KEY,
  region: "us-east-1"
});

function attchmentDataToResult(data: ModuleAttachmentsInstance): AttachmentsInterface {
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
  return `${tenant}/${moduleName}/${ownertId.split("-").join("")}/${originalname}_${now}`
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

export async function getAllAttachments(req: UserRequest, res: Response): Promise<Response> {
  const { tenantId, ownerId } = req.params;
  if (!tenantId || !ownerId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (user.tenant !== tenantId) return res.status(401).send({ message: "Sem permissão!" });
    const data = await moduleAttachmentsDB.findAll({ where: { ownerId }, order: [['createdAt', 'DESC']] });
    const resultData = [] as AttachmentsInterface[];
    if (data.length > 0) data.forEach(d => resultData.push(attchmentDataToResult(d)));
    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function createAttachments(req: UserRequest, res: Response): Promise<Response> {
  const { body } = req;
  if (!body.ownerId) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const user = await userDB.findOne({ where: { id: req.userId } });
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileName = attchmentName(user.tenant, body.ownerId, file.originalname);
        await sendAttchment(file, fileName);
        await moduleAttachmentsDB.create({
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

export async function deleteOneAttachment(req: UserRequest, res: Response): Promise<Response> {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Dados inválidos!" });
  try {
    const data = await moduleAttachmentsDB.findByPk(id);
    if (!data) return res.status(404).send({ message: "Nenhum registro encontrado!" });
    await deleteFromBucket(data.link, process.env.NX_BUCKET_FILES)
    await moduleAttachmentsDB.destroy({ where: { id: id } });
    return res.status(200).send({ message: "Anexo deletado!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
