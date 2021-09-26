import { useHistory } from "react-router-dom";
import { Callout, MailIcon, TrashIcon } from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { route } from "../../People";
import { PeopleInterface } from "../../People";
import { DateTime } from "luxon";

export interface ListInvitesProps {
  dataList: PeopleInterface[];
  setSelected(selected: PeopleInterface): void;
  setSendConfirm(confirm: boolean): void;
  setDeleteConfirm(confirm: boolean): void;
}

export function ListInvites({
  dataList,
  setSelected,
  setSendConfirm,
  setDeleteConfirm,
}: ListInvitesProps) {
  const history = useHistory();

  return dataList.length === 0 ? (
    <Callout title={`Nenhum Convite Enviado`} type={WARNING_TYPES.INFO} />
  ) : (
    <div className=" overflow-x-auto">
      <div className="bg-primary-500 text-white text-sm uppercase font-bold p-2">
        Convites
      </div>
      <table className="w-full table">
        <tbody className="text-gray-600 text-sm font-light">
          {dataList &&
            dataList.map((data, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-3 text-left whitespace-nowrap">
                  {data.name}
                </td>
                <td className="py-3 px-3 text-left hidden sm:table-cell">
                  {data.email ? (
                    <a href={`mailto:${data.email}`} className="underline">
                      {data.email}
                    </a>
                  ) : (
                    <span>{data.email}</span>
                  )}
                </td>
                <td className="py-3 px-3 text-left whitespace-nowrap">
                Enviado em {DateTime.fromISO(
                    data.updatedAt?.toString() as string
                  ).toFormat("dd/MM/yy HH:mm")}
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-end justify-end">
                    <div className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                      <div
                        onClick={() => {
                          setSelected(data);
                          setSendConfirm(true);
                        }}
                        className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                      >
                        <MailIcon styles={"cursor-pointer"} />
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        setSelected(data);
                        setDeleteConfirm(true);
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

export default ListInvites;
