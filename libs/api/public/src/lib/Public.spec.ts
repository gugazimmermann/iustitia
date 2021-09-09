import * as request from "supertest";
import * as express from "express";
import Public from './Public'

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
});

