import { useHistory } from "react-router-dom";
import { formatAddress, getUserInitials } from "@iustitia/site/shared-utils";
import { GetModule, ModulesEnum, GetRoutes, BCRoutesInterface } from "@iustitia/modules";
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, PenIcon, TrashIcon } from "@iustitia/site/icons";
import { BusinessContactsServices } from "@iustitia/site/services";

const BCRoutes = GetRoutes(ModulesEnum.businessContacts) as BCRoutesInterface;

type BCPersonsType = BusinessContactsServices.BCPersonsRes;

export interface ListProps {
  dataList: BCPersonsType[];
  sort: string;
  setSort(order: "ASC" | "DESC"): void;
  setSelected(delected: BCPersonsType): void;
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

  return (
    <div className=" overflow-x-auto">
      <table className="w-full table">
        <thead>
          <tr className="bg-primary-500 text-white uppercase leading-normal">
            <th className="w-12"></th>
            <th className="py-2 px-2 text-sm text-left">
              Nome
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
            <th className="py-2 px-2 text-sm text-left">Telefone</th>
            <th className="py-2 px-2 text-sm text-left">E-Mail</th>
            <th className="py-2 px-2 text-sm text-left">Cidade / UF</th>
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
                <td className="py-3 px-3">
                  {data.avatar ? (
                    <img
                      className="w-6 h-6 rounded-full"
                      src={`${process.env.NX_BUCKET_AVATAR_URL}${data.avatar}`}
                      alt={data.name}
                    />
                  ) : (
                    <span className="w-6 h-6 rounded-full flex justify-center items-center text-center font-bold text-primary-500 bg-primary-50 hover:text-primary-900 hover:bg-primary-100 focus:outline-none focus:bg-primary-100 focus:ring-primary-900">
                      {data.name ? getUserInitials(data.name) : "I"}
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 text-left whitespace-nowrap">
                  <span className="font-medium">{data.name}</span>
                </td>
                <td className="py-3 px-3 text-left">
                  <span>{data.phone}</span>
                </td>
                <td className="py-3 px-3 text-left">
                  {data.email ? (
                    <a href={`mailto:${data.email}`} className="underline">
                      {data.email}
                    </a>
                  ) : (
                    <span>{data.email}</span>
                  )}
                </td>
                <td className="py-3 px-3 text-left">
                  <span>{formatAddress(data?.city, data?.state)}</span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-end justify-end">
                    <div className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                      <div
                        onClick={() =>
                          history.push(`${BCRoutes.listPersons}/${data.id}`)
                        }
                        className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                      >
                        <EyeIcon styles={"cursor-pointer"} />
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        history.push(`${BCRoutes.updatePerson}/${data.id}`)
                      }
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
