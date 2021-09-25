import { useHistory } from "react-router-dom";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Callout,
  EyeIcon,
  PenIcon,
  TrashIcon,
} from "@iustitia/site/shared-components";
import { OfficeInterface, route, singular } from "../../Offices";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";

export interface ListProps {
  dataList: OfficeInterface[];
  sort: string;
  setSort(order: "ASC" | "DESC"): void;
  setSelected(delected: OfficeInterface): void;
  setConfirm(confirm: boolean): void;
}

export function List({
  dataList,
  sort,
  setSort,
  setSelected,
  setConfirm,
}: ListProps) {
  const history = useHistory();

  return dataList.length === 0 ? (
    <Callout title={`Nenhum ${singular}Cadastrado`} type={WARNING_TYPES.INFO} />
  ) : (
    <div className=" overflow-x-auto">
      <table className="w-full table">
        <thead>
          <tr className="bg-primary-500 text-white uppercase leading-normal">
            <th className="py-2 px-2 text-sm text-left">
              Escritório
              {sort === "ASC" && (
                <button onClick={() => setSort("DESC")}>
                  <ArrowDownIcon styles="h-4 w-4 inline" stroke={2} />
                </button>
              )}
              {sort === "DESC" && (
                <button onClick={() => setSort("ASC")}>
                  <ArrowUpIcon styles="h-4 w-4 inline" stroke={2} />
                </button>
              )}
            </th>
            <th className="py-2 px-2 text-sm text-left">Cidade</th>
            <th className="py-2 px-2 text-sm text-left">Responsável</th>
            <th className="py-2 px-2 text-sm text-left">Usuários</th>
            <th className="py-2 px-2 text-sm text-left">Status</th>
            <th className="py-2 px-2"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {dataList &&
            dataList.map((data, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-3 text-left whitespace-nowrap">
                  <span className="font-medium">{data.name}</span>
                </td>
                <td className="py-3 px-3 text-left hidden sm:table-cell">
                  <div className="flex items-center">
                    <span>{`${data.city} / ${data.state}`}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-left hidden sm:table-cell">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <img
                        className="w-6 h-6 rounded-full"
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt="respionsavel name"
                      />
                    </div>
                    <span>Paulo Souza</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-center hidden sm:table-cell">
                  <div className="flex items-center justify-center">
                    <img
                      className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt="usuario 1"
                    />
                    <img
                      className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                      src="https://randomuser.me/api/portraits/women/2.jpg"
                      alt="usuario 2"
                    />
                    <img
                      className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                      src="https://randomuser.me/api/portraits/men/3.jpg"
                      alt="usuario 3"
                    />
                  </div>
                </td>
                <td className="py-3 px-3 text-center hidden sm:table-cell">
                  <span className="bg-primary-200 text-primary-500 font-bold py-1 px-3 rounded-full text-xs">
                    Ativo
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-end justify-end">
                    <div className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                      <div
                        onClick={() => history.push(`${route}/${data.id}`)}
                        className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                      >
                        <EyeIcon styles={"cursor-pointer"} />
                      </div>
                    </div>
                    <div
                      onClick={() => history.push(`${route}/edit/${data.id}`)}
                      className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                    >
                      <PenIcon styles={"cursor-pointer"} />
                    </div>
                    <div
                      onClick={() => {
                        setSelected(data);
                        setConfirm(true);
                      }}
                      className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                    >
                      <TrashIcon styles={"cursor-pointer"} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
