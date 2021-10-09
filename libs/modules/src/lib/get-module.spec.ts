import { ModulesEnum } from "..";
import { GetModule } from "./get-module";

describe("modules", () => {
  it("should work", () => {
    const getModules = GetModule(ModulesEnum.profiles);
    expect(getModules).toEqual({
      name: ModulesEnum.profiles,
      singular: "Perfil",
      plural: "Perfis",
      routes: {
        profile: "/perfil",
      },
      menu: [],
    });
  });
});
