import { ArrowDownIcon, ArrowUpIcon } from "@iustitia/site/icons";
import { SORT_TYPES } from "@iustitia/site/shared-utils";

export interface ListHeaderItems {
  name: string;
  align?: "left" | "right" | "center";
  sort?: boolean;
}

export interface ListHeaderProps {
  items: ListHeaderItems[];
  sort: string;
  setSort(order: SORT_TYPES): void;
}

export function ListHeader({ items, sort, setSort }: ListHeaderProps) {
  return (
    <thead>
      <tr className="bg-primary-500 text-white uppercase align-baseline">
        {items.map((item, i) => (
          <th
            key={i}
            className={`py-2 px-2 text-sm ${
              item.align === "center"
                ? `text-center`
                : item.align === "right"
                ? `text-right`
                : `text-left`
            }`}
          >
            {item.name}
            {item.sort && sort === SORT_TYPES.ASC && (
              <button onClick={() => setSort(SORT_TYPES.DESC)}>
                <ArrowDownIcon styles="h-4 w-4 inline" stroke={2} />
              </button>
            )}
            {item.sort && sort === SORT_TYPES.DESC && (
              <button onClick={() => setSort(SORT_TYPES.ASC)}>
                <ArrowUpIcon styles="h-4 w-4 inline" stroke={2} />
              </button>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default ListHeader;
