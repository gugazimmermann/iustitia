export const DefaultColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];
export const DefaultVariants = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const colorEvents: string[] = [];
for (const color of DefaultColors) {
  for (const variant of DefaultVariants) {
    colorEvents.push(`${color}-${variant}`);
  }
}
function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

const EVENT_COLORS = strEnum(colorEvents)

// TODO: add to tailwind prod all colors
export const SeeEventBackgroundColor = (color: string) => {
  return color in EVENT_COLORS ? `bg-${color}` : `bg-primary-500`;
}

export const SeeEventTextColor = (color: string) => {
  return +color.split("-")[1] >= 500 ? `text-white` : `text-gray-900`
};


