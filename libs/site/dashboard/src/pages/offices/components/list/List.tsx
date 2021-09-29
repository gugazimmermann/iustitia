import { useHistory } from "react-router-dom";
import {
  ActiveBadge,
  ArrowDownIcon,
  ArrowUpIcon,
  Callout,
  ShowAvatars,
} from "@iustitia/site/shared-components";
import { OfficeInterface, route, singular } from "../../Offices";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { PeopleServices, ProfileServices } from "@iustitia/site/services";

export interface ListProps {
  dataList: OfficeInterface[];
  sort: string;
  setSort(order: "ASC" | "DESC"): void;
}

export function convertProfileToSimpleProfile(
  profiles: ProfileServices.ProfileInterface[]
) {
  const simpleProfiles: PeopleServices.SimpleUserInterface[] = [];
  for (const profile of profiles)
    simpleProfiles.push(
      profile as unknown as PeopleServices.SimpleUserInterface
    );
  return simpleProfiles;
}

export function List({
  dataList,
  sort,
  setSort,
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
            <th className="py-2 px-2 text-sm text-center">Responsáveis</th>
            <th className="py-2 px-2 text-sm text-center">Usuários</th>
            <th className="py-2 px-2 text-sm text-center">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-600 text-sm">
          {dataList &&
            dataList.map((data, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => history.push(`${route}/${data.id}`)}
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
                  <div className="flex items-center justify-center">
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
