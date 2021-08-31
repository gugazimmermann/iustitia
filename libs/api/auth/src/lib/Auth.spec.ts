import { apiAuth } from "./Auth";

describe("apiAuth", () => {
  it("should work", () => {
    expect(apiAuth()).toEqual("api-auth");
  });
});
