import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { database } from '@iustitia/api/database';
import config from "../config";

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
  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    };
    const user = await database.User.create(userData);
    await user.update({ tenant: user.id });
    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export async function signin(req, res) {
  try {
    const user = await database.User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({ message: "Invalid User or Password." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid User or Password." });
    }
    const accessToken = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });
    const refreshToken = await createToken(user);
    res.status(200).send({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export async function refreshToken(req, res) {
  if (!req.body.refreshToken) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    const refreshToken = await database.RefreshToken.findOne({
      where: { token: req.body.refreshToken },
    });
    if (!refreshToken) {
      return res.status(403).json({ message: "Refresh token is not in database!" });
    }
    if (verifyExpiration(refreshToken)) {
      database.RefreshToken.destroy({ where: { id: refreshToken.id } });
      return res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
    }

    const userId = await refreshToken.get('userId')
    const newAccessToken = jwt.sign({ id: userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });

    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: refreshToken.token });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

export async function userInfo(req, res) {
  try {
    const user = await database.User.findOne({ where: { id: req.userId } });
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
