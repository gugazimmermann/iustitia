import { EyeIcon, PenIcon, TrashIcon } from "@iustitia/site/shared-components";
import { OfficeInterface } from "../../Offices";

export interface ListProps {
  offices: OfficeInterface[];
  setSelectedOffice(office: OfficeInterface): void;
  setBack(back: boolean): void;
  setUpdade(updade: boolean): void;
  setList(list: boolean): void;
  setConfirm(confirm: boolean): void;
}

export function List({
  offices,
  setSelectedOffice,
  setBack,
  setUpdade,
  setList,
  setConfirm,
}: ListProps) {
  return (
    <table className="min-w-max w-full table-auto">
      <thead>
        <tr className="bg-primary-500 text-white uppercase leading-normal">
          <th className="py-2 px-2 text-sm text-left">Escritório</th>
          <th className="py-2 px-2 text-sm text-left hidden sm:table-cell">
            Cidade
          </th>
          <th className="py-2 px-2 text-sm text-left hidden sm:table-cell">
            Responsável
          </th>
          <th className="py-2 px-2 text-sm text-center hidden sm:table-cell">
            Usuários
          </th>
          <th className="py-2 px-2 text-sm text-center hidden sm:table-cell">
            Status
          </th>
          <th className="py-2 px-2 text-center"></th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {offices &&
          offices.map((office, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-3 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <span className="font-medium">{office.name}</span>
                </div>
              </td>
              <td className="py-3 px-3 text-left hidden sm:table-cell">
                <div className="flex items-center">
                  <span>{`${office.city} / ${office.state}`}</span>
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
              <td className="py-3 px-3 text-center">
                <div className="flex item-center justify-center">
                  <div className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                    <EyeIcon styles={"cursor-pointer"} />
                  </div>
                  <div
                    onClick={() => {
                      setSelectedOffice(office);
                      setBack(true);
                      setList(false);
                      setUpdade(true);
                    }}
                    className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                  >
                    <PenIcon styles={"cursor-pointer"} />
                  </div>
                  <div
                    onClick={() => {
                      setSelectedOffice(office);
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
  );
}

export default List;
