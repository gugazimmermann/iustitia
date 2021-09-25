import { Response } from "express";
import { UserRequest } from "@iustitia/api/auth";

export function publicAccess(req: UserRequest, res: Response): Response {
  return res.status(200).send("Public Content.");
}
