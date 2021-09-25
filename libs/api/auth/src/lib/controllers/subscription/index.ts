import { Request, Response } from 'express';
import { database } from '@iustitia/api/database';

export async function getAllPlans(req: Request, res: Response): Promise<Response> {
  try {
    const plans = await database.Plan.findAll();
    return res.status(200).send(plans);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
