import { database } from '@iustitia/api/database';
import { Request, Response, NextFunction } from "express";

export default async function checkDuplicateEmail(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
  try {
    const user = await database.Users.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(400).send({ message: "Email já esta cadastrado!" });
    }
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
