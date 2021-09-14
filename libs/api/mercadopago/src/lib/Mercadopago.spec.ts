import { apiMercadopago } from "./Mercadopago";

describe("apiMercadopago", () => {
  it("should work", () => {
    expect(apiMercadopago()).toEqual("api-mercadopago");
  });
});
