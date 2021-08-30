import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import db from "../db";
import { authConfig } from "../config";
const { user: User, refreshToken: RefreshToken } = db;

export async function signup(req, res) {
  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    };
    const user = await User.create(userData);
    await user.update({ tenant: user.id });
    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export async function signin(req, res) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(404).send({ message: "Invalid User or Password." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      res.status(401).send({ message: "Invalid User or Password." });
    }
    const accessToken = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.jwtExpiration,
    });
    const refreshToken = await RefreshToken.createToken(user);
    res.status(200).send({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export async function refreshToken(req, res) {
  if (!req.body.refreshToken) {
    res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    const refreshToken = await RefreshToken.findOne({
      where: { token: req.body.refreshToken },
    });
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });
      res
        .status(403)
        .json({
          message:
            "Refresh token was expired. Please make a new signin request",
        });
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.jwtExpiration,
    });

    res.status(200).json({ accessToken: newAccessToken, refreshToken: refreshToken.token });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}
