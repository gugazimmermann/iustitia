import * as jwt from "jsonwebtoken";
import config from "../config";

export interface UserReq extends Request {
  userId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any;
}

function catchError(err, res) {
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).send({ message: "Não Autorizado! Access Token espirou!" });
  }
  return res.sendStatus(401).send({ message: "Não Autorizado!" });
};

export default function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).send({ message: "Token é necessário!" });
  try {
    const decoded = jwt.verify((token as string), config.jwtSecret);
    if (!decoded) return res.sendStatus(401).send({ message: "Não Autorizado!" });
    req.userId = (decoded as jwt.JwtPayload).id;
    next();
  } catch (err) {
    return catchError(err, res);
  }

}
