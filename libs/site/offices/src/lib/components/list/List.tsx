import { useHistory } from "react-router-dom";
import {
  ActiveBadge,
  Callout,
  ListHeader,
  ListHeaderItems,
  ShowAvatars,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { ProfileServices } from "@iustitia/site/services";
import { convertProfileToSimpleProfile, OfficeInterface, OfficeModule } from "../../Offices";

export interface ListProps {
  dataList: OfficeInterface[];
  sort: string;
  setSort(order: "ASC" | "DESC"): void;
}

export function List({
  dataList,
  sort,
  setSort,
}: ListProps) {
  const history = useHistory();

  const headerItems: ListHeaderItems[] = [
    { name: "Escritório", sort: true },
    { name: "Cidade" },
    { name: "Responsáveis" },
    { name: "Usuários" },
    { name: "Status", align: "center" },
  ];

  return dataList.length === 0 ? (
    <Callout title={`Nenhum ${OfficeModule.singular}Cadastrado`} type={WARNING_TYPES.INFO} />
  ) : (
    <div className=" overflow-x-auto">
      <table className="w-full table">
        <ListHeader items={headerItems} sort={sort} setSort={setSort} />
        <tbody className="bg-white text-gray-600 text-sm">
          {dataList &&
            dataList.map((data, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => history.push(`${OfficeModule.route}/${data.id}`)}
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
                  <div className="flex items-center justify-start">
                    {
                      <ShowAvatars
                      toShow={convertProfileToSimpleProfile(data.managersOffice as ProfileServices.ProfileInterface[])}
                        qtd={8}
                        smallQtd={3}
                      />
                    }
                  </div>
                </td>
                <td className="text-center hidden sm:table-cell">
                  <div className="flex items-center justify-start">
                    {
                      <ShowAvatars
                      toShow={convertProfileToSimpleProfile(data.usersOffice as ProfileServices.ProfileInterface[])}
                        qtd={8}
                        smallQtd={3}
                      />
                    }
                  </div>
                </td>
                <td className="text-center hidden sm:table-cell">
                  <ActiveBadge status={data.active} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;