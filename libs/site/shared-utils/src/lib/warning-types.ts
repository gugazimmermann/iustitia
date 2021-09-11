export enum WARNINGTYPES {
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
  NONE=""
}

export function warningTypes(type: WARNINGTYPES) {
  const text = !type
    ? `text-primary-500`
    : type === WARNINGTYPES.WARNING
      ? `text-secondary-500`
      : type === WARNINGTYPES.ERROR
        ? `text-red-500`
        : `text-blue-500`;

  const bg = !type
    ? `bg-primary-500`
    : type === WARNINGTYPES.WARNING
      ? `bg-secondary-500`
      : type === WARNINGTYPES.ERROR
        ? `bg-red-500`
        : `bg-blue-500`;

  const border = !type
    ? `border-primary-500`
    : type === WARNINGTYPES.WARNING
      ? `border-secondary-500`
      : type === WARNINGTYPES.ERROR
        ? `border-red-500`
        : `border-blue-500`;

  return { text, bg, border }
}
