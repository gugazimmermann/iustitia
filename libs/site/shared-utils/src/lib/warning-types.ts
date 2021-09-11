export enum WARNING_TYPES {
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
  NONE=""
}

export function warningTypes(type: WARNING_TYPES) {
  const text = !type
    ? `text-primary-500`
    : type === WARNING_TYPES.WARNING
      ? `text-secondary-500`
      : type === WARNING_TYPES.ERROR
        ? `text-red-500`
        : `text-blue-500`;

  const bg = !type
    ? `bg-primary-500`
    : type === WARNING_TYPES.WARNING
      ? `bg-secondary-500`
      : type === WARNING_TYPES.ERROR
        ? `bg-red-500`
        : `bg-blue-500`;

  const border = !type
    ? `border-primary-500`
    : type === WARNING_TYPES.WARNING
      ? `border-secondary-500`
      : type === WARNING_TYPES.ERROR
        ? `border-red-500`
        : `border-blue-500`;

  return { text, bg, border }
}
