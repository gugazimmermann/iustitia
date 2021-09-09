import * as request from "supertest";
import * as express from "express";
import Dashboard from "./Dashboard";

jest.mock('@iustitia/api/database', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Dashboard(app);

const data = {
  name: "AAA",
  email: "test@test.com",
  phone: "(11) 11111-1111",
  zip: "88.888-888",
  address: "BBB",
  number: "99",
  complement: "00",
  neighborhood: "CCC",
  city: "DDD",
  state: "EEE"
};

describe("Dashboard", () => {
  test("/api/profile should response the POST method", async () => {
    const response = await request(app).post("/api/profile").send({ data });
    expect(response.statusCode).toBe(403);
  });
});
