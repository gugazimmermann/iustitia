import * as request from "supertest";
import * as express from "express";
import Public from './Public'

// TODO: create test for controllers

jest.mock('@iustitia/api/database', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Public(app);

describe("public", () => {

  test("/api/public should response the GET method", async () => {
    const response = await request(app).get("/api/public");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Public Content.')
  });

  test("/api/user should return 400", async () => {
    const response = await request(app).post("/api/user");
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Failed! User is needed!")
  });

  test("/api/user should return 500", async () => {
    const response = await request(app).post("/api/user").send({ user: '79fd712e-aaf5-43ee-a2a0-f59c72e70aba'});
    expect(response.statusCode).toBe(500);
  });

});

