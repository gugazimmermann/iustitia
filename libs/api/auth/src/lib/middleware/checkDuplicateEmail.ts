import { database } from '@iustitia/api/database';

export default async function checkDuplicateEmail(req, res, next) {
  try {
    const user = await database.User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(400).send({ message: "Email já esta cadastrado!" });
    }
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
