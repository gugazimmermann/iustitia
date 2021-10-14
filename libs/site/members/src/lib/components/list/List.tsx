import { useHistory } from "react-router-dom";
import {
  ActiveBadge,
  Callout,
  ListHeader,
  ListHeaderItems,
  RoleBadge,
} from "@iustitia/site/shared-components";
import { getUserInitials, WARNING_TYPES } from "@iustitia/site/shared-utils";
import { MembersServices } from "@iustitia/site/services";
import { GetModule, ModulesEnum, ModulesInterface, GetRoutes, MembersRoutesInterface } from "@iustitia/modules";

const membersModule = GetModule(ModulesEnum.members) as ModulesInterface;
const membersRoutes = GetRoutes(ModulesEnum.members) as MembersRoutesInterface;

type MembersSimpleType = MembersServices.MembersSimpleRes;

export interface ListProps {
  dataList: MembersSimpleType[];
  sort: string;
  setSort(order: "ASC" | "DESC"): void;
}

export function List({ dataList, sort, setSort }: ListProps) {
  const history = useHistory();

  const headerItems: ListHeaderItems[] = [
    { name: "" },
    { name: "Nome", sort: true },
    { name: "Telefone" },
    { name: "Email" },
    { name: "Tipo", align: "center" },
    { name: "Status", align: "center" },
  ];

  return dataList.length === 0 ? (
    <Callout
      title={`Nenhuma ${membersModule.singular} Cadastrado`}
      type={WARNING_TYPES.INFO}
    />
  ) : (
    <div className=" overflow-x-auto">
      <table className="w-full table ">
        <ListHeader items={headerItems} sort={sort} setSort={setSort} />
        <tbody className="bg-white text-gray-600 text-sm">
          {dataList &&
            dataList.map((data, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => history.push(`${membersRoutes.details}/${data.id}`)}
              >
                <td className="py-3 px-3 text-left">
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
                <td className="text-left hidden sm:table-cell">{data.phone}</td>
                <td className="text-left hidden sm:table-cell">
                  {data.email ? (
                    <a href={`mailto:${data.email}`} className="underline">
                      {data.email}
                    </a>
                  ) : (
                    <span>{data.email}</span>
                  )}
                </td>
                <td className="text-center hidden sm:table-cell">
                  <RoleBadge role={data.role as string} />
                </td>
                <td className="text-center hidden sm:table-cell">
                  <ActiveBadge status={data.active as boolean} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
