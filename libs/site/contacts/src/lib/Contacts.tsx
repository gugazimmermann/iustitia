import { useState } from "react";
import {
  Alert,
  EyeIcon,
  Header,
  PenIcon,
  TrashIcon,
} from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";

export function Contacts() {
  const [showSuccess, setShowSuccess] = useState(false);
  return (
    <>
      <Header before={["Agenda"]} main="Contatos" />
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center overflow-hidden p-2">
          <div className="w-full">
            {showSuccess && (
              <Alert
                type={WARNING_TYPES.SUCCESS}
                message="Perfil Alerado com Sucesso!"
                closeFunction={setShowSuccess}
              />
            )}
            <div className="bg-white shadow-sm rounded">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-primary-500 text-white uppercase leading-normal">
                    <th className="w-12 py-2 px-2 text-sm text-left hidden sm:table-cell"></th>
                    <th className="py-2 px-2 text-sm text-left">Nome</th>
                    <th className="py-2 px-2 text-sm text-left hidden sm:table-cell">
                      Empresa
                    </th>
                    <th className="py-2 px-2 text-sm text-left hidden sm:table-cell">
                      Cargo
                    </th>
                    <th className="py-2 px-2 text-sm text-left hidden sm:table-cell">
                      telefone
                    </th>
                    <th className="py-2 px-2 text-sm text-left hidden sm:table-cell">
                      E-Mail
                    </th>
                    <th className="py-2 px-2 text-center"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-3 text-left hidden sm:table-cell">
                      <img
                        className="w-6 h-6 rounded-full"
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt="respionsavel name"
                      />
                    </td>
                    <td className="py-3 px-3 text-left">
                      <span>Jose Augusto Zimmermann de Negreiros</span>
                    </td>
                    <td className="py-3 px-3 text-left hidden sm:table-cell">
                      <span>Teste</span>
                    </td>
                    <td className="py-3 px-3 text-left hidden sm:table-cell">
                      <span>CEO</span>
                    </td>
                    <td className="py-3 px-3 text-left hidden sm:table-cell">
                      <span>(47) 98870-4247</span>
                    </td>
                    <td className="py-3 px-3 text-left hidden sm:table-cell">
                      <span>gugazimmermann@gmail.com</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                          <EyeIcon styles={"cursor-pointer"} />
                        </div>
                        <div className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                          <TrashIcon styles={"cursor-pointer"} />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contacts;
