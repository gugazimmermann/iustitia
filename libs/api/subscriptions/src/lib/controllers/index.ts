import { Response } from "express";
import { database } from '@iustitia/api/database';

export interface SubscriptionInterface {
  id?: string;
  userId?: string;
  planId: string;
  reason: string;
  frequency: number;
  frequencyType: string;
  transactionAmount: number;
  status: boolean;
  type?: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export async function getPlans(req, res): Promise<Response> {
  try {
    const plans = await database.Plans.findAll();
    return res.status(200).send(plans);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getSubscription(req, res): Promise<Response> {
  try {
    const subscription = await database.Subscriptions.findOne({ where: { userId: req.userId } });
    return res.status(200).send(subscription);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getPayments(req, res): Promise<Response> {
  try {
    const payments = await database.Payments.findAll({
      where: { userId: req.userId }, order: [
        ['paidDate', 'DESC']
      ]
    });
    return res.status(200).send(payments);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getCreditcards(req, res): Promise<Response> {
  try {
    const creditcards = await database.Creditcards.findAll({ where: { userId: req.userId } });
    return res.status(200).send(creditcards);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
