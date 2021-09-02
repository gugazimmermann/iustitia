import { database } from '@iustitia/api/database';

export const publicAccess = (req, res) => res.status(200).send("Public Content.");

export async function userById(req, res) {
  if (!req.body?.user) {
    return res.status(400).send({ message: "Failed! User is needed!" });
  }
  try {
    const user = await database.User.findOne({ where: { id: req.body.user } });
    if (!user) {
      return res.status(404).send({ message: "User Not Found!" });
    }
    res.status(200).send({
      username: user.username,
      email: user.email,
      tenant: user.tenant,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
