import { Modules } from "..";
import { ModulesEnum } from "./enum";
import { ModulesInterface } from "./interfaces";

export function GetModule(name: ModulesEnum): ModulesInterface | undefined {
  const module = Modules.find((m) => m.name === name);
  return module ? module : undefined;
}
