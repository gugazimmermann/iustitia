import * as jwt from "jsonwebtoken";
import { authConfig } from "../config";

const catchError = (err, res) => {
  if (err instanceof jwt.TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

export default function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];
  if (!token) return res.status(403).send({ message: "No token provided!" });
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return catchError(err, res);
    req.userId = decoded.id;
    next();
  });
}
