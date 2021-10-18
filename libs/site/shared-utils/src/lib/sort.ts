export interface MayHaveName { name?: string; }

export enum SORT_TYPES {
  ASC = "ASC",
  DESC = "DESC",
}

export default function Sort<T extends MayHaveName>(data: T[], sort: SORT_TYPES) {
  if (data?.length) {
    if (sort === SORT_TYPES.ASC) data.sort((a, b) => (a.name as string).localeCompare((b.name as string)));
    if (sort === SORT_TYPES.DESC) data.sort((a, b) => (b.name as string).localeCompare((a.name as string)));
    return data;
  } else {
    return [];
  }
}
