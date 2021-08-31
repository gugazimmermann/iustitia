import { apiDatabase } from "./Database";

describe("apiDatabase", () => {
  it("should work", () => {
    expect(apiDatabase()).toEqual("api-database");
  });
});
