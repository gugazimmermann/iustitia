import request from "supertest";
import express from "express";
import Attachments from './Attachments'
import { ModulesEnum } from "@iustitia/modules";
import jwt from "jsonwebtoken";

jest.mock('@iustitia/api/database', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Attachments(app);

describe("Attachments", () => {

  test("/auth/me should return 403", async () => {
    const jwtSpy = jest.spyOn(jwt, 'verify');
    jwtSpy.mockReturnValue({
      id: 'fd6bc51e-195e-4433-b404-8a9fdfa0f632',
      iat: 1633770659,
      exp: 1633774259
    }
    );
    // jwtSpy.mockImplementationOnce(() => { throw new Error('Invalid access token') });
    const response = await request(app)
      .get(`/api/${ModulesEnum.attachments}/dc774bf1-bc3f-4bfa-8685-433daf479506/3234ccd5-4bbc-4660-9c52-781b0d539f1b`)
      .set('x-access-token', 'fa00a93c-68c4-42fc-9636-1748f058e1fb');
    console.log(response.statusCode)
    expect(response.statusCode).toBe(403);
  });

  test("/auth/me should return 401", async () => {
    const response = await request(app).get(`/api/${ModulesEnum.attachments}/:tenantId/:ownerId`).set('x-access-token', 'fa00a93c-68c4-42fc-9636-1748f058e1fb');
    console.log(response.statusCode)
    expect(response.statusCode).toBe(401);
  });
});
