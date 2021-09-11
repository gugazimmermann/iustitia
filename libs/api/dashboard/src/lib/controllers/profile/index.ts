import * as AWS from 'aws-sdk';
import * as sharp from 'sharp';
import { database } from '@iustitia/api/database';
import { validateEmail } from '@iustitia/site/shared-utils';

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.NX_ACCESS_KEY_ID,
  secretAccessKey: process.env.NX_SECRET_ACCESS_KEY,
  region: "us-east-1"
})

export async function updateProfile(req, res) {
  const { body } = req;
  if (
    !body.name ||
    !body.email ||
    !validateEmail(body.email) ||
    !body.address ||
    !body.neighborhood ||
    !body.city ||
    !body.state ||
    !body.phone ||
    !body.zip
  ) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  body.userId = req.userId
  try {
    const profile = await database.Profile.findOne({ where: { userId: req.userId } });
    profile.update(body)
    if (req.file) {
      if (profile.avatar) {
        const currentObject = {
          Bucket: process.env.NX_AVATAR_BUCKET,
          Key: profile.avatar
        }
        const currentAvatar = await s3.headObject(currentObject).promise().then(() => true,
          err => {
            if (err.code === 'NotFound') {
              return false;
            }
            throw err;
          }
        );
        if (currentAvatar) {
          await s3.deleteObject(currentObject).promise();
        }
      }
      const avatarFile = await sharp(req.file.buffer).resize(240, 240).jpeg({ quality: 90, mozjpeg: true }).toBuffer()
      const d = new Date();
      const now = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`
      const fileName = `${req.userId.split("-").join("")}${now}.jpeg`
      const params = {
        Bucket: process.env.NX_AVATAR_BUCKET,
        Key: fileName,
        Body: avatarFile
      };
      await s3.upload(params).promise();
      profile.update({ avatar: fileName });
    }
    return res.send({
      avatar: profile.avatar,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      zip: profile.zip,
      address: profile.address,
      number: profile.number,
      complement: profile.complement,
      neighborhood: profile.neighborhood,
      city: profile.city,
      state: profile.state
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getProfile(req, res) {
  try {
    const profile = await database.Profile.findOne({ where: { userId: req.userId } });
    if (!profile) {
      return res.status(404).send({ message: "Perfil não encontrado!" });
    }
    return res.status(200).send({
      avatar: profile.avatar,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      zip: profile.zip,
      address: profile.address,
      number: profile.number,
      complement: profile.complement,
      neighborhood: profile.neighborhood,
      city: profile.city,
      state: profile.state
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
