import { GetMenu } from "./get-menu";

describe("modules", () => {
  it("should work", () => {
    const getMenu = GetMenu();
    expect(getMenu.length).toEqual(6);
  });
});
