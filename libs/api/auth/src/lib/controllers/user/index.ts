import { database } from '@iustitia/api/database';

export async function userInfo(req, res) {
  try {
    const user = await database.User.findOne({ where: { id: req.userId } });
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado!" });
    }
    return res.status(200).send({
      username: user.username,
      email: user.email,
      tenant: user.tenant,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
