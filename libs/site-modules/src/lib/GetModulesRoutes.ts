import { SiteModulesInterface } from "./interfaces";
import ModulesProperties from "./ModulesProperties";

type KeyValueString = {
  [key: string]: string;
};

export function GetModulesRoutes(): KeyValueString {
  return ModulesProperties.reduce(
    (res: KeyValueString, module: SiteModulesInterface) => {
      res[module.name] = `/${module.name}`;
      return res;
    },
    {}
  );
}

export default GetModulesRoutes
