import { SearchIcon } from "../..";

export interface SearchFieldProps {
  setSearchParam(searchParam: string): void;
}

export function SearchField({ setSearchParam }: SearchFieldProps) {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <SearchIcon styles="h-6 h-6 text-gray-500" />
      </span>
      <input
        type="search"
        name="search"
        className="py-2 pl-10 rounded-md text-sm focus:ring-0 focus:ring-opacity-75 text-gray-900 focus:ring-primary-500 border-gray-300"
        placeholder="Procurar..."
        autoComplete="off"
        onChange={(e) => setSearchParam(e.target.value)}
      />
    </div>
  );
}

export default SearchField;
