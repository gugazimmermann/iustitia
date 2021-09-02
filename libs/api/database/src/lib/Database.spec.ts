import database from "./Database";

describe("database", () => {
  it("should have users table", () => {
    expect(database.User.tableName).toEqual("users");
  });

  it("should have refreshTokens table", () => {
    expect(database.RefreshToken.tableName).toEqual("refreshTokens");
  });

  it("should have forgotPasswords table", () => {
    expect(database.ForgotPassword.tableName).toEqual("forgotPasswords");
  });
});
