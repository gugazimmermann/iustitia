import { Response } from "express";

export function publicAccess(req, res): Response {
  return res.status(200).send("Public Content.");
}
