import { useEffect } from "react";
import { DateTime } from "luxon";
import { IPayment } from "../../../interfaces";

export interface ListPaymentsProps {
  payments: IPayment[];
}

export function ListPayments({ payments }: ListPaymentsProps) {
  function translateStatus(status: string) {
    switch (status) {
      case "Paid":
        return (
          <span className="bg-green-200 text-green-700 font-bold py-1 px-3 rounded-full text-xs">
            Pago
          </span>
        );
      default:
        return (
          <span className="bg-secondary-200 text-secondary-700 font-bold py-1 px-3 rounded-full text-xs">
            Em Aberto
          </span>
        );
    }
  }

  return (
    <>
      <div className="bg-primary-500 text-white uppercase font-bold p-2">
        Pagamentos
      </div>
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-primary-500 text-white uppercase leading-normal">
            <th className="py-2 px-2 text-sm text-left">Data</th>
            <th className="py-2 px-2 text-sm text-center">Valor</th>
            <th className="py-2 px-2 text-sm text-right">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {payments &&
            payments.map((payment, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-3 text-left whitespace-nowrap">
                  <span>
                    {DateTime.fromISO(payment.paidDate).toFormat("MM/yyyy")}
                  </span>
                </td>
                <td className="py-3 px-3 text-center whitespace-nowrap">
                  <span>
                    {payment?.transactionAmount.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "brl",
                    })}
                  </span>
                </td>
                <td className="py-3 px-3 text-right whitespace-nowrap">
                  {translateStatus(payment.status)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ListPayments;