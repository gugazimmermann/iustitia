import { Request, Response, NextFunction } from 'express'
import * as jwt from "jsonwebtoken";
import config from "../config"

export interface AttachmentFileInterface extends File {
  originalname: string;
  buffer: Buffer;
}

export interface UserRequest extends Request {
  userId: string;
  file: AttachmentFileInterface;
  files?: AttachmentFileInterface[];
};

function catchError(err: unknown, res: Response): Response {
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).send({ message: "Não Autorizado! Access Token espirou!" });
  }
  return res.sendStatus(401).send({ message: "Não Autorizado!" });
};

export default function verifyToken(req: UserRequest, res: Response, next: NextFunction): Response | Error {
  const token= req.headers["x-access-token"];
  if (!token) return res.status(403).send({ message: "Token é necessário!" });
  jwt.verify((token as string), config.jwtSecret, (err, decoded) => {
    if (err) return catchError(err, res);
    req.userId = decoded.id;
    next();
  });
}
