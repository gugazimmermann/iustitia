import * as jwt from "jsonwebtoken";
import config from "../config"

const catchError = (err, res) => {
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).send({ message: "Não Autorizado! Access Token espirou!" });
  }
  return res.sendStatus(401).send({ message: "Não Autorizado!" });
};

export default function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).send({ message: "Token é necessário!" });
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return catchError(err, res);
    req.userId = decoded.id;
    next();
  });
}
