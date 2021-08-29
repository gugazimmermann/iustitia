import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import db from "../db";

const User = db.user;
const jwtSecret = process.env.NX_JWT_SECRET;

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
    if (!user) return res.status(404).send({ message: "Invalid User or Password." });
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password );
    if (!passwordIsValid) return res.status(401).send({ message: "Invalid User or Password." });
    const token = jwt.sign({ id: user.id }, jwtSecret);
    res.status(200).send({ accessToken: token });
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}
