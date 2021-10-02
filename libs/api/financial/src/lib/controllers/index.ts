import { Response } from "express";

export function placeholderFunction(req, res): Response {
  return res.status(200).send({ message: "Placeholder Function"});
}
