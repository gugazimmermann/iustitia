import * as request from "supertest";
import * as express from "express";
import Mercadopago from './Mercadopago'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Mercadopago(app);

describe("Mercadopago", () => {

  test("/mp/subscription should response the GET method", async () => {
    const response = await request(app).get("/mp/subscription");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("subscription")
  });
});

