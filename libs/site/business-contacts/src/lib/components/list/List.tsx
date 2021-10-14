import { useHistory } from "react-router-dom";
import { formatAddress, WARNING_TYPES } from "@iustitia/site/shared-utils";
import { ModulesEnum, GetModule, ModulesInterface } from "@iustitia/modules";
import { BusinessContactsServices } from "@iustitia/site/services";
import {
  AvatarOrInitial,
  Callout,
  ListHeader,
  ListHeaderItems,
} from "@iustitia/site/shared-components";

const BCModule = GetModule(ModulesEnum.businessContacts) as ModulesInterface;

type BCPersonsType = BusinessContactsServices.BCPersonsRes;

export interface ListProps {
  dataList: BCPersonsType[];
  detailsRoute: string;
  sort: string;
  setSort(order: "ASC" | "DESC"): void;
}

export function List({ dataList, detailsRoute, sort, setSort }: ListProps) {
  const history = useHistory();

  const headerItems: ListHeaderItems[] = [
    { name: "" },
    { name: "Nome", sort: true },
    { name: "Telefone" },
    { name: "Email" },
    { name: "Cidade / UF" },
  ];

  return dataList.length === 0 ? (
    <Callout
      title={`Nenhum ${BCModule.singular} Cadastrado`}
      type={WARNING_TYPES.INFO}
    />
  ) : (
    <div className=" overflow-x-auto">
      <table className="w-full table">
        <ListHeader items={headerItems} sort={sort} setSort={setSort} />
        <tbody className="bg-white text-gray-600 text-sm">
          {dataList &&
            dataList.map((data, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => history.push(`${detailsRoute}/${data.id}`)}
              >
                <td className="py-3 px-3">
                  <AvatarOrInitial
                    avatar={data.avatar}
                    name={data.name}
                    avatarStyle="w-6 h-6"
                    initialStyle="w-6 h-6"
                  />
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
