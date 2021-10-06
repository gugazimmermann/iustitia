import * as AWS from 'aws-sdk';
import sharp from 'sharp';

const BUCKET_AVATAR = process.env.NX_BUCKET_AVATAR as string;
const ACCESS_KEY_ID = process.env.NX_ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY = process.env.NX_SECRET_ACCESS_KEY as string;

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: "us-east-1"
});

export interface AttachmentFileInterface extends File {
  originalname: string;
  buffer: Buffer;
}

function avatarName(tenantId: string, id: string): string {
  const d = new Date();
  const now = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`
  return `${tenantId.split("-").join("")}/${id.split("-").join("")}${now}.jpeg`
}

export async function sendAvatar(file: AttachmentFileInterface, tenantId: string, id: string): Promise<AWS.S3.ManagedUpload.SendData> {
  const avatarFile = await sharp(file.buffer).resize(240, 240).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
  const fileName = avatarName(tenantId, id);
  const params = {Bucket: BUCKET_AVATAR, Key: fileName, Body: avatarFile };
  const res = await s3.upload(params).promise();
  return res;
}

export async function deleteFromBucket(fileName: string): Promise<void> {
  const params = { Bucket:  BUCKET_AVATAR, Key: fileName };
  const currentObject = await s3.headObject(params).promise().then(() => true, err => {
    if (err.code === 'NotFound') return false;
    throw err;
  });
  if (currentObject) await s3.deleteObject(params).promise();
}

