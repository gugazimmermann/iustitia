export interface MenuItemInterface {
  name: string;
  icon: JSX.Element;
  subItems: MenuSubItemInterface[]
}

export interface MenuSubItemInterface {
  name: string;
  link: string;
}
