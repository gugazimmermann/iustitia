import * as request from "supertest";
import * as express from "express";
import Contacts from './Contacts'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Contacts(app);

describe("contacts", () => {

  test("/api/public should response the GET method", async () => {
    const response = await request(app).get("/api/public");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Public Content.')
  });
});

