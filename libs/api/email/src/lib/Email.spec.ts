import { apiEmail } from "./Email";

describe("apiEmail", () => {
  it("should work", () => {
    expect(apiEmail()).toEqual("api-email");
  });
});
