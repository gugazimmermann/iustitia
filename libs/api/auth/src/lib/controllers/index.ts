import { Request, Response } from 'express'
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from "luxon";
import * as mercadopago from 'mercadopago';
import { UserRequest } from "@iustitia/interfaces";
import { database } from '@iustitia/api/database';
import { ForgotPasswordEmail } from '@iustitia/api/email';
import { validateEmail } from "@iustitia/site/shared-utils";
import { AuthRoutes } from '@iustitia/site-modules';
import config from "../config";

const ACCESS_TOKEN =
  process.env.NX_STAGE === "dev"
    ? process.env.NX_MERCADOPAGO_ACCESS_TOKEN_TEST
    : process.env.NX_MERCADOPAGO_ACCESS_TOKEN;

mercadopago.configure({ access_token: ACCESS_TOKEN });

async function createToken(userId: string): Promise<string> {
  const expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
  const refreshToken = await database.AuthRefreshToken.create({
    token: uuidv4(),
    expiryDate: expiredAt,
    userId: userId,
  });
  return refreshToken.token;
};

function verifyExpiration(expiryDate: Date): boolean {
  return expiryDate.getTime() < new Date().getTime();
};

export async function signup(req: Request, res: Response): Promise<Response> {
  if (!req.body?.name || !req.body?.password || !req.body?.email || !validateEmail(req.body.email) || !req.body?.planId) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  try {
    const userPlan = await database.SubscriptionsPlans.findByPk(req.body.planId);
    if (userPlan.transactionAmount !== 0 && !req.body?.cardInfo) {
      return res.status(400).send({ message: "Dados inválidos!" });
    }
    const userData = { email: req.body.email, password: bcrypt.hashSync(req.body.password, 8), active: true };
    const user = await database.AuthUsers.create(userData);
    const role = await database.AuthRoles.findOne({ where: { name: "Admin"}})
    await user.update({ tenant: user.id });
    user.addRole(role);
    await database.Profiles.create({
      name: req.body.name,
      email: userData.email,
      userId: user.id
    });
    const subscription = await database.Subscriptions.create({
      reason: userPlan.reason,
      frequency: userPlan.frequency,
      frequencyType: userPlan.frequencyType,
      transactionAmount: userPlan.transactionAmount,
      status: true,
      type: userPlan.type,
      planId: userPlan.id,
      userId: user.id,
    });

    if (userPlan.transactionAmount !== 0) {
      const { cardInfo } = req.body;

      // const preapproval = await mercadopago.preapproval.create({
      //   "preapproval_plan_id": userPlan.preapprovalPlanId,
      //   "card_token_id": cardInfo.id,
      //   "payer_email": user.email
      // });
      // console.log(preapproval)
      const creditcard = await database.SubscriptionsCreditcards.create({
        name: cardInfo.name,
        firstSixDigits: cardInfo.firstSixDigits,
        lastFourDigits: cardInfo.lastFourDigits,
        expirationMonth: cardInfo.expirationMonth,
        expirationYear: cardInfo.expirationYear,
        status: true,
        userId: user.id,
      });

      await database.SubscriptionsPayments.create({
        transactionAmount: userPlan.transactionAmount,
        status: "Paid",
        paidDate: new Date(),
        subscriptionId: subscription.id,
        creditcardId: creditcard.id,
        userId: user.id,
      });

    }
    return res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function signin(req: Request, res: Response): Promise<Response> {
  if (!req.body?.password || !req.body?.email || !validateEmail(req.body.email)) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  try {
    const user = await database.AuthUsers.findOne({
      where: { email: req.body.email },
      include: "subscription"
    });
    if (!user) return res.status(404).send({ message: "Email ou senha inválidos!" });
    if (!user.active) return res.status(401).send({ message: "Cadastro Inativo!" });
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(404).send({ message: "Email ou senha inválidos!" });
    }
    if (!user.subscription || !user.subscription.status) {
      return res.status(404).send({ message: "Assinatura não encontrada!" });
    }
    const accessToken = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });
    const refreshToken = await createToken(user.id);
    return res.status(200).send({ accessToken, refreshToken, tenant: user.tenant });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function forgotPassword(req: Request, res: Response): Promise<Response> {
  if (!req.body.email || !validateEmail(req.body.email)) {
    return res.status(400).json({ message: "Email é necessário!" });
  }
  try {
    const user = await database.AuthUsers.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado!" });
    }
    const dt = DateTime.now();
    const expiryDate = dt.plus({ hours: 1 });
    const forgotPasswordParams = {
      route: AuthRoutes.ChangePassword,
      email: req.body.email,
      date: expiryDate.toFormat("dd/MM/yyyy HH:mm:ss"),
      code: +Math.random().toString().substring(2, 6),
      codeUrl: uuidv4()
    }
    await database.AuthForgotPassword.create({
      email: forgotPasswordParams.email,
      code: forgotPasswordParams.code,
      codeurl: forgotPasswordParams.codeUrl,
      expiryDate: expiryDate.toJSDate()
    });
    await ForgotPasswordEmail(forgotPasswordParams);
    return res.status(200).json({
      email: forgotPasswordParams.email,
      date: expiryDate.toFormat("dd/MM/yyyy HH:mm:ss")
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

export async function forgotPasswordCode(req: Request, res: Response): Promise<Response> {
  if (!req.body.urlcode) {
    return res.status(400).json({ message: "Código é necessário!" });
  }
  try {
    const forgotPassword = await database.AuthForgotPassword.findOne({ where: { codeurl: req.body.urlcode } });
    if (!forgotPassword) {
      return res.status(404).send({ message: "Código não encontrado!" });
    }
    return res.status(200).json({ code: forgotPassword.code });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function changePassword(req: Request, res: Response): Promise<Response> {
  if (!req.body.code || !req.body.password) {
    return res.status(400).json({ message: "Código e Senha são necessários!" });
  }
  try {
    const forgotPassword = await database.AuthForgotPassword.findOne({ where: { code: req.body.code } });
    if (!forgotPassword) {
      return res.status(404).send({ message: "Código não encontrado!" });
    }
    const dt = DateTime.now();
    const forgotPasswordDate = DateTime.fromJSDate(forgotPassword.expiryDate)
    if (dt <= forgotPasswordDate) {
      const user = await database.AuthUsers.findOne({ where: { email: forgotPassword.email } });
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }
      user.update({ password: bcrypt.hashSync(req.body.password, 8), })
      database.AuthForgotPassword.destroy({ where: { id: forgotPassword.id } })
      return res.status(200).send({ message: "Password changed successfully!" });
    } else {
      return res.status(401).json({ message: "Código expirado!" });
    }
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

export async function refreshToken(req: Request, res: Response): Promise<Response> {
  if (!req.body.refreshToken) {
    return res.status(400).json({ message: "Refresh Token é necessário!" });
  }
  try {
    const refreshToken = await database.AuthRefreshToken.findOne({
      where: { token: req.body.refreshToken },
    });
    if (!refreshToken) {
      return res.status(404).json({ message: "Refresh token não encontrado!" });
    }
    if (verifyExpiration(refreshToken.expiryDate)) {
      database.AuthRefreshToken.destroy({ where: { id: refreshToken.id } });
      return res.status(403).json({
        message: "Refresh token está expirado. Faça Login novamente.",
      });
    }
    const userId = await refreshToken.get('userId')
    const newAccessToken = jwt.sign({ id: userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });

    return res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: refreshToken.token });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

export async function me(req: UserRequest, res: Response): Promise<Response> {
  try {
    const user = await database.AuthUsers.findOne({ where: { id: req.userId } });
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
