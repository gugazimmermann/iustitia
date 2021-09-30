import { SiteModulesInterface } from "./interfaces";
import ModulesProperties from "./ModulesProperties";

/**
 * Receive the Module properties from desired Site Module
 * @param name SiteModulesEnum
 * @returns SiteModulesInterface
 */
export function GetModule(name: string): SiteModulesInterface | undefined {
  const module = ModulesProperties.find((m) => m.name === name);
  return module || undefined;
}

export default GetModule;
