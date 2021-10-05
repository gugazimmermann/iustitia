import { Modules } from "..";
import { MenuItemInterface } from "./interfaces";

export function GetMenu(): MenuItemInterface[] {
  const items: MenuItemInterface[] = [];
  for (const module of Modules)
    if (module.menu) module.menu.map((m) => items.push(m));
  return items;
}
