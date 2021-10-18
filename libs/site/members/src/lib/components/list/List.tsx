import { useHistory } from "react-router-dom";
import {
  ActiveBadge,
  AvatarOrInitial,
  Callout,
  ListHeader,
  ListHeaderItems,
  RoleBadge,
} from "@iustitia/site/shared-components";
import { SORT_TYPES, WARNING_TYPES } from "@iustitia/site/shared-utils";
import { MembersServices } from "@iustitia/site/services";
import {
  GetModule,
  ModulesEnum,
  ModulesInterface,
  GetRoutes,
  MembersRoutesInterface,
} from "@iustitia/modules";

const membersModule = GetModule(ModulesEnum.members) as ModulesInterface;
const membersRoutes = GetRoutes(ModulesEnum.members) as MembersRoutesInterface;

type MembersSimpleType = MembersServices.MembersSimpleRes;

export interface ListProps {
  dataList: MembersSimpleType[];
  sort: string;
  setSort(order: SORT_TYPES): void;
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
                onClick={() =>
                  history.push(`${membersRoutes.details}/${data.id}`)
                }
              >
                <td className="py-3 px-3 text-left">
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
