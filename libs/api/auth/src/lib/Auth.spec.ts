import * as request from "supertest";
import * as express from "express";
import Auth from './Auth'

// TODO: create test

jest.mock('@iustitia/api/database', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Auth(app);

describe("public", () => {

  test("/auth/me should return 403", async () => {
    const response = await request(app).get("/auth/me");
    expect(response.statusCode).toBe(403);
  });

  test("/auth/me should return 401", async () => {
    const response = await request(app).get("/auth/me").set('x-access-token', 'fa00a93c-68c4-42fc-9636-1748f058e1fb');
    expect(response.statusCode).toBe(401);
  });
});

