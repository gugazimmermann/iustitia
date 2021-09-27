export interface MayHaveName { name?: string; }

export default function Sort<T extends MayHaveName>(data: T[], sort: "ASC" | "DESC") {
  if (data?.length) {
    if (sort === "ASC") data.sort((a, b) => (a.name as string).localeCompare((b.name as string)));
    if (sort === "DESC") data.sort((a, b) => (b.name as string).localeCompare((a.name as string)));
    return data;
  } else {
    return [];
  }
}
