import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from "luxon";
import { SiteRoutes as Routes } from '@iustitia/react-routes';
import { database } from '@iustitia/api/database';
import { sendForgotPasswordEmail } from '@iustitia/api/email';
import { validateEmail } from "@iustitia/site/shared-utils";
import config from "../../config"

async function createToken(user) {
  const expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
  const refreshToken = await database.RefreshToken.create({
    token: uuidv4(),
    expiryDate: expiredAt,
    userId: user.id,
  });
  return refreshToken.token;
};

function verifyExpiration(token) {
  return token.expiryDate.getTime() < new Date().getTime();
};

export async function signup(req, res) {
  if (!req.body?.name || !req.body?.password || !req.body?.email || !validateEmail(req.body.email)) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  try {
    const userData = { email: req.body.email, password: bcrypt.hashSync(req.body.password, 8) };
    const user = await database.User.create(userData);
    await user.update({ tenant: user.id });
    await database.Profile.create({
      name: req.body.name,
      email: userData.email,
      userId: user.id
    });
    return res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function subscription(req, res) {
  if (!req.body?.email || !validateEmail(req.body.email) || !req.body?.plan) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  try {
    const user = await database.User.findOne({ where: { email: req.body.email }});
    const userPlan = await database.Plan.findByPk(req.body.plan);
    await database.Subscription.create({
      userId: user.id,
      planId: userPlan.id,
      reason: userPlan.reason,
      frequency: userPlan.frequency,
      frequencyType: userPlan.frequencyType,
      transactionAmount: userPlan.transactionAmount,
      status: true
    });
    // TODO WITH REAL PAYMENT
    if (userPlan.transactionAmount !== 0) {
      await database.Creditcard.create({
        userId: user.id,
        name: "Visa",
        lastFourDigits: 5682,
        expirationMonth: 11,
        expirationYear: 2020
      });
      await database.Payment.create({
        userId: user.id,
        paidDate: new Date(),
        transactionAmount: userPlan.transactionAmount,
        status: "approved"
      });
    }
    return res.status(201).send({ message: "Assinatura criada com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function signin(req, res) {
  if (!req.body?.password || !req.body?.email || !validateEmail(req.body.email)) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }
  try {
    const user = await database.User.findOne({ where: { email: req.body.email }});
    if (!user) {
      return res.status(404).send({ message: "Email ou senha inválidos!" });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(404).send({ message: "Email ou senha inválidos!" });
    }
    const subscription = await database.Subscription.findOne({ where: { userId: user.id } });
    if (!subscription) {
      return res.status(404).send({ message: "Assinatura não encontrada!" });
    }
    const accessToken = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });
    const refreshToken = await createToken(user);
    return res.status(200).send({ accessToken, refreshToken, tenant: user.tenant });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function forgotPassword(req, res) {
  if (!req.body.email || !validateEmail(req.body.email)) {
    return res.status(400).json({ message: "Email é necessário!" });
  }
  try {
    const user = await database.User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado!" });
    }
    const dt = DateTime.now();
    const expiryDate = dt.plus({ hours: 1 });
    const forgotPasswordParams = {
      route: Routes.ChangePassword,
      email: req.body.email,
      date: expiryDate.toFormat("dd/MM/yyyy HH:mm:ss"),
      code: +Math.random().toString().substr(2, 6),
      codeUrl: uuidv4()
    }
    await database.ForgotPassword.create({
      email: forgotPasswordParams.email,
      code: forgotPasswordParams.code,
      codeurl: forgotPasswordParams.codeUrl,
      expiryDate: expiryDate.toJSDate()
    });
    await sendForgotPasswordEmail(forgotPasswordParams);
    return res.status(200).json({
      email: forgotPasswordParams.email,
      date: expiryDate.toFormat("dd/MM/yyyy HH:mm:ss")
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

export async function forgotPasswordCode(req, res) {
  if (!req.body.urlcode) {
    return res.status(400).json({ message: "Código é necessário!" });
  }
  try {
    const forgotPassword = await database.ForgotPassword.findOne({ where: { codeurl: req.body.urlcode } });
    if (!forgotPassword) {
      return res.status(404).send({ message: "Código não encontrado!" });
    }
    return res.status(200).json({ code: forgotPassword.code });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function changePassword(req, res) {
  if (!req.body.code || !req.body.password) {
    return res.status(400).json({ message: "Código e Senha são necessários!" });
  }
  try {
    const forgotPassword = await database.ForgotPassword.findOne({ where: { code: req.body.code } });
    if (!forgotPassword) {
      return res.status(404).send({ message: "Código não encontrado!" });
    }
    const dt = DateTime.now();
    const forgotPasswordDate = DateTime.fromJSDate(forgotPassword.expiryDate)
    if (dt <= forgotPasswordDate) {
      const user = await database.User.findOne({ where: { email: forgotPassword.email } });
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }
      user.update({ password: bcrypt.hashSync(req.body.password, 8), })
      database.ForgotPassword.destroy({ where: { id: forgotPassword.id } })
      return res.status(200).send({ message: "Password changed successfully!" });
    } else {
      return res.status(401).json({ message: "Código expirado!" });
    }
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

export async function refreshToken(req, res) {
  if (!req.body.refreshToken) {
    return res.status(400).json({ message: "Refresh Token é necessário!" });
  }
  try {
    const refreshToken = await database.RefreshToken.findOne({
      where: { token: req.body.refreshToken },
    });
    if (!refreshToken) {
      return res.status(404).json({ message: "Refresh token não encontrado!" });
    }
    if (verifyExpiration(refreshToken)) {
      database.RefreshToken.destroy({ where: { id: refreshToken.id } });
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
