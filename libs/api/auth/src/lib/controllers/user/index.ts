import { database } from '@iustitia/api/database';
import { Response } from 'express'
import { UserRequest } from '../../middleware/verifyToken';

export async function userInfo(req: UserRequest, res: Response): Promise<Response> {
  try {
    const user = await database.User.findOne({ where: { id: req.userId } });
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado!" });
    }
    return res.status(200).send({
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
