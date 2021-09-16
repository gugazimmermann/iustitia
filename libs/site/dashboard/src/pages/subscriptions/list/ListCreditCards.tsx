import {
  CloseIcon,
  CreditCardIcon,
  TrashIcon,
} from "@iustitia/site/shared-components";
import { ICreditCard } from "../../../interfaces";

export interface ListCreditCardsProps {
  creditCards: ICreditCard[];
}

export function ListCreditCards({ creditCards }: ListCreditCardsProps) {
  function translateStatus(status: boolean) {
    switch (status) {
      case true:
        return (
          <span className="bg-green-200 text-green-700 font-bold py-1 px-3 rounded-full text-xs">
            Ativo
          </span>
        );
      default:
        return (
          <span className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded-full text-xs">
            Inativo
          </span>
        );
    }
  }

  return (
    <>
      <div className="bg-primary-500 text-white uppercase font-bold p-2 mt-4">
        Cartões
      </div>
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-primary-500 text-white uppercase leading-normal">
            <th className="py-2 px-2 text-sm text-left  hidden sm:table-cell">
              Titular
            </th>
            <th className="py-2 px-2 text-sm text-center">Número</th>
            <th className="py-2 px-2 text-sm text-center  hidden sm:table-cell">
              Validade
            </th>
            <th className="py-2 px-2 text-sm text-center">Status</th>
            <th className="py-2 px-2 text-right"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {creditCards &&
            creditCards.map((creditCard, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-3 text-left whitespace-nowrap  hidden sm:table-cell">
                  <span>{creditCard.name}</span>
                </td>
                <td className="py-3 px-3 text-center whitespace-nowrap">
                  <span>{`${creditCard.firstSixDigits.substring(0, 4)} ... ${
                    creditCard.lastFourDigits
                  }`}</span>
                </td>
                <td className="py-3 px-3 text-center whitespace-nowrap  hidden sm:table-cell">
                  <span>
                    {creditCard.expirationMonth} / {creditCard.expirationYear}
                  </span>
                </td>
                <td className="py-3 px-3 text-center whitespace-nowrap">
                  {translateStatus(creditCard.status)}
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex item-center justify-center">
                    <div className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                      {creditCard.status ? (
                        <CloseIcon styles={"cursor-pointer"} />
                      ) : (
                        <CreditCardIcon styles={"w-6 cursor-pointer"} />
                      )}
                    </div>
                    <div
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
    </>
  );
}

export default ListCreditCards;
