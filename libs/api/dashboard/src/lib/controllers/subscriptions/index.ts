import { Response } from "express";
import { UserRequest } from "@iustitia/api/auth";
import { database } from '@iustitia/api/database';

export async function getPlans(req: UserRequest, res: Response): Promise<Response> {
  try {
    const plans = await database.Plan.findAll();
    console.log(plans)
    return res.status(200).send(plans);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getSubscription(req: UserRequest, res: Response): Promise<Response> {
  try {
    const subscription = await database.Subscription.findOne({ where: { userId: req.userId } });
    return res.status(200).send(subscription);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getPayments(req: UserRequest, res: Response): Promise<Response> {
  try {
    const payments = await database.Payment.findAll({
      where: { userId: req.userId }, order: [
        ['paidDate', 'DESC']
      ]
    });
    return res.status(200).send(payments);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getCreditcards(req: UserRequest, res: Response): Promise<Response> {
  try {
    const creditcards = await database.Creditcard.findAll({ where: { userId: req.userId } });
    return res.status(200).send(creditcards);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
