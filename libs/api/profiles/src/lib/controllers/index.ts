import { Response } from "express";
import * as AWS from 'aws-sdk';
import sharp from 'sharp';
import { database } from '@iustitia/api/database';
import { validateEmail } from '@iustitia/site/shared-utils';
import { SubscriptionInterface } from "@iustitia/api/subscriptions";

export interface ProfilesInterface {
  id?: string;
  role: string;
  isAdmin?: boolean;
  isProfessional?: boolean;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  subscription?: SubscriptionInterface;
};

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.NX_ACCESS_KEY_ID,
  secretAccessKey: process.env.NX_SECRET_ACCESS_KEY,
  region: "us-east-1"
})

export async function updateProfile(req, res): Promise<Response> {
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
    const profile = await database.Profiles.findOne({ where: { userId: req.userId } });
    if (!profile) return res.status(404).send({ message: "Perfil não encontrado!" });
    profile.update(body)
    if (req.file) {
      if (profile.avatar) {
        const currentObject = {
          Bucket: process.env.NX_BUCKET_AVATAR as string,
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
        Bucket: process.env.NX_BUCKET_AVATAR as string,
        Key: fileName,
        Body: avatarFile
      };
      await s3.upload(params).promise();
      profile.update({ avatar: fileName });
    }
    const user = await database.Users.findOne({
      where: { id: req.userId },
      include: ["subscription", "profile", "roles"],
    });
    if (!user || !user.roles || !user.profile || !user.subscription) return res.status(404).send({ message: "Perfil não encontrado!" });
    return res.status(200).send({
      role: user?.roles[0].name,
      avatar: user?.profile.avatar,
      name: user?.profile.name,
      email: user?.profile.email,
      phone: user?.profile.phone,
      zip: user?.profile.zip,
      address: user?.profile.address,
      number: user?.profile.number,
      complement: user?.profile.complement,
      neighborhood: user?.profile.neighborhood,
      city: user?.profile.city,
      state: user?.profile.state,
      subscription: {
        planId: user?.subscription.planId,
        type: user?.subscription.type,
        reason: user?.subscription.reason,
        frequency: user?.subscription.frequency,
        createdAt: user?.subscription.createdAt,
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getProfile(req, res): Promise<Response> {
  try {
    const user = await database.Users.findOne({
      where: { id: req.userId },
      include: ["subscription", "profile", "roles"],
    });
    if (!user || !user.roles || !user.profile || !user.subscription) {
      return res.status(404).send({ message: "Perfil não encontrado!" });
    }
    return res.status(200).send({
      role: user.roles[0].name,
      avatar: user.profile.avatar,
      name: user.profile.name,
      email: user.profile.email,
      phone: user.profile.phone,
      zip: user.profile.zip,
      address: user.profile.address,
      number: user.profile.number,
      complement: user.profile.complement,
      neighborhood: user.profile.neighborhood,
      city: user.profile.city,
      state: user.profile.state,
      subscription: {
        planId: user.subscription.planId,
        type: user.subscription.type,
        reason: user.subscription.reason,
        frequency: user.subscription.frequency,
        createdAt: user.subscription.createdAt,
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
