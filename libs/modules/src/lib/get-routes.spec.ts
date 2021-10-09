import { ModulesEnum } from "..";
import { GetRoutes } from "./get-routes";

describe("GetRoutes", () => {
  it("should work", () => {
    const getRoutes = GetRoutes(ModulesEnum.profiles);
    expect(getRoutes).toEqual({profile: "/perfil"});
  });
});
