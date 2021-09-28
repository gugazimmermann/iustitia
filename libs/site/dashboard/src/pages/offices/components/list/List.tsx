import { useHistory } from "react-router-dom";
import {
  ActiveBadge,
  ArrowDownIcon,
  ArrowUpIcon,
  Callout,
  EyeIcon,
  Tooltip,
  TrashIcon,
} from "@iustitia/site/shared-components";
import { OfficeInterface, route, singular } from "../../Offices";
import { getUserInitials, WARNING_TYPES } from "@iustitia/site/shared-utils";

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
            <th className="py-2 px-2 text-sm text-center">Responsável</th>
            <th className="py-2 px-2 text-sm text-center">Usuários</th>
            <th className="py-2 px-2 text-sm text-center">Status</th>
            <th className="py-2 px-2"></th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-600 text-sm">
          {dataList &&
            dataList.map((data, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-3 text-left whitespace-nowrap">
                  <span className="font-medium">{data.name}</span>
                </td>
                <td className="text-left hidden sm:table-cell">
                  <div className="flex items-center">
                    <span>{`${data.city} / ${data.state}`}</span>
                  </div>
                </td>
                <td className="text-center hidden sm:table-cell">
                  <div className="flex items-center justify-center">
                    {data.managersOffice &&
                      data.managersOffice.map((manager, i) => (
                        <Tooltip
                          key={i}
                          message={manager.name}
                          styles="w-8 h-8 -ml-1"
                        >
                          {manager.avatar ? (
                            <img
                              className="w-8 h-8 rounded-full border transform hover:scale-125"
                              src={`${process.env.NX_BUCKET_AVATAR_URL}${manager.avatar}`}
                              alt={manager.name}
                            />
                          ) : (
                            <span className="w-8 h-8 rounded-full flex justify-center items-center text-center font-bold text-primary-500 bg-primary-50  border transform hover:scale-125">
                              {manager.name
                                ? getUserInitials(manager.name)
                                : "I"}
                            </span>
                          )}
                        </Tooltip>
                      ))}
                  </div>
                </td>
                <td className="text-center hidden sm:table-cell">
                  <div className="flex items-center justify-center">
                    {data.usersOffice &&
                      data.usersOffice.map((user, i) => (
                        <Tooltip
                          key={i}
                          message={user.name}
                          styles="w-8 h-8 -ml-1"
                        >
                          {user.avatar ? (
                            <img
                              className="w-8 h-8 rounded-full  border transform hover:scale-125"
                              src={`${process.env.NX_BUCKET_AVATAR_URL}${user.avatar}`}
                              alt={user.name}
                            />
                          ) : (
                            <span className="w-8 h-8 rounded-full flex justify-center items-center text-center font-bold text-primary-500 bg-primary-50  border transform hover:scale-125">
                              {user.name ? getUserInitials(user.name) : "I"}
                            </span>
                          )}
                        </Tooltip>
                      ))}
                  </div>
                </td>
                <td className="text-center hidden sm:table-cell">
                  <ActiveBadge status={data.active} />
                </td>
                <td>
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
