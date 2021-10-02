export interface MenuItemInterface {
  name: string;
  icon: string;
  subItems: MenuSubItemInterface[];
}

export interface MenuSubItemInterface {
  name: string;
  link: string;
}
