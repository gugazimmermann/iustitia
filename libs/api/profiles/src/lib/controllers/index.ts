import { Response } from "express";
import { database, UsersInstance } from '@iustitia/api/database';
import { validateEmail } from '@iustitia/site/shared-utils';
import { deleteFromBucket, sendAvatar } from "../../../../utils/avatar";

export interface ProfilesInterface {
  id?: string;
  isAdmin: boolean;
  isProfessional: boolean;
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
  subscription?: {
    planId: string;
    type: string;
    reason: string;
    frequency: number;
    createdAt: string;
  };
};

function dataToProfilesResult(user: UsersInstance): ProfilesInterface {
  return {
    isAdmin: (user.roles && user.roles.length && user.roles[0].name === "Admin") ? true : false,
    isProfessional: (user.subscription && user.subscription.type === "professional") ? true : false,
    avatar: user?.profile?.avatar || "",
    name: user?.profile?.name || "",
    email: user?.profile?.email || "",
    phone: user?.profile?.phone || "",
    zip: user?.profile?.zip || "",
    address: user?.profile?.address || "",
    number: user?.profile?.number || "",
    complement: user?.profile?.complement || "",
    neighborhood: user?.profile?.neighborhood || "",
    city: user?.profile?.city || "",
    state: user?.profile?.state || "",
    subscription: {
      planId: user?.subscription?.planId || "",
      type: user?.subscription?.type || "",
      reason: user?.subscription?.reason || "",
      frequency: user?.subscription?.frequency || 0,
      createdAt: (user.subscription && user.subscription.createdAt) ? user.subscription.createdAt.toString() : "",
    }
  }
}

async function getUserById(id: string): Promise<UsersInstance | undefined> {
  const user = await database.Users.findOne({
    where: { id }, include: ["subscription", "profile", "roles"],
  });
  if (!user || !user.subscription || !user.profile || !user.roles) return undefined;
  return user;
}

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
    const response = await database.Sequelize.transaction(async () => {
      const profile = await database.Profiles.findOne({ where: { userId: body.userId } });
      if (!profile) return res.status(404).send({ message: "Perfil não encontrado!" });
      await profile.update(body);
      await profile.save();
      if (req.file) {
        if (profile.avatar) deleteFromBucket(profile.avatar);
        const { Key } = await sendAvatar(req.file, body.userId, body.userId);
        if (Key) profile.update({ avatar: Key });
      }
      const user = await getUserById(body.userId);
      if (!user) return res.status(404).send({ message: "Perfil não encontrado!" });
      return user;
    });
    return res.status(200).send(dataToProfilesResult(response));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getProfile(req, res): Promise<Response> {
  try {
    const user = await getUserById(req.userId);
    if (!user) return res.status(404).send({ message: "Perfil não encontrado!" });
    return res.status(200).send(dataToProfilesResult(user));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
