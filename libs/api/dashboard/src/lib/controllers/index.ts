import { database } from '@iustitia/api/database';
import { validateEmail } from '@iustitia/site/shared-utils';
import * as AWS from 'aws-sdk';

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
    return res.status(401).send({ message: "Dados inválidos!" });
  }
  body.userId = req.userId
  try {
    const profile = await database.Profile.findOne({ where: { userId: req.userId } });
    profile.update(body)
    if (req.file) {
      const fileName = `${req.userId.split("-").join("")}.${req.file.originalname.split('.').pop()}`
      AWS.config.update({
        accessKeyId: process.env.NX_ACCESS_KEY_ID,
        secretAccessKey: process.env.NX_SECRET_ACCESS_KEY,
        region: "us-east-1"
      })
      const s3 = new AWS.S3();
      const params = {
        Bucket: 'iustitia-io-avatars',
        Key: fileName,
        Body: req.file.buffer
      };
      s3.putObject(params, async (err, data) => {
        if (err) {
          console.error(err);
        } else {
          profile.update({ avatar: fileName });
        }
      });
    } else {
      profile.update({ avatar: null });
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
