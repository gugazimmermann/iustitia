import { Response } from "express";
import { UserRequest } from "@iustitia/interfaces";

export function placeholderFunction(req: UserRequest, res: Response): Response {
  return res.status(200).send({ message: "Placeholder Function"});
}
