import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Alert, AlertInterface, Header } from "@iustitia/site/shared-components";
import ListPayments from "./components/list/ListPayments";
import ListCreditCards from "./components/list/ListCreditCards";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { SubscriptionServices } from "@iustitia/site/services";

export const { route, singular, parents, plural } = SubscriptionServices.SubscriptionModule;
export type SubscriptionInterface = SubscriptionServices.SubscriptionInterface;
export type CreditCardInterface = SubscriptionServices.CreditCardInterface;
export type PaymentInterface = SubscriptionServices.PaymentInterface;


export function Subscriptions() {
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: "",
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const [subscription, setSubscription] = useState({} as SubscriptionInterface);
  const [payments, setPayments] = useState([] as PaymentInterface[]);
  const [creditCards, setCreditCards] = useState([] as CreditCardInterface[]);
  const [list, setList] = useState(true);
  const [back, setBack] = useState(false);

  useEffect(() => {
    populateData();
    setList(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function showList() {
    setList(true);
    setBack(false);
  }

  const createButton = (state: boolean) => {
    return (
      <button
        onClick={() => {
          if (back) {
            setBack(false);
            showList();
          } else {
            setList(false);
            setBack(true);
          }
        }}
        className={`px-4 py-2 text-sm text-white rounded-md ${
          !state
            ? `bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
            : `bg-secondary-500 hover:bg-secondary-700 `
        }`}
      >
        {back ? "Voltar" : "Alterar Plano"}
      </button>
    );
  };

  async function populateData() {
    try {
      const dataSubscription = (await SubscriptionServices.getSubscription()) as SubscriptionInterface;
        delete dataSubscription.id;
        delete dataSubscription.userId;
        delete dataSubscription.updatedAt;
        delete dataSubscription.createdAt;
        delete dataSubscription.deletedAt;
        setSubscription(dataSubscription);

      const resPayment = (await SubscriptionServices.getPayments()) as PaymentInterface[];
      const dataPayment = resPayment.map((p) => {
        delete p.id;
        delete p.userId;
        delete p.updatedAt;
        delete p.createdAt;
        delete p.deletedAt;
        return p;
      });
      const currentMonth = dataPayment.find((p) => {
        const date = DateTime.fromISO(p.paidDate).toFormat("MM");
        const thisMonth = DateTime.now().toFormat("MM");
        if (date === thisMonth) return true;
        return false;
      });
      if (!currentMonth) {
        dataPayment.unshift({
          transactionAmount: dataSubscription.transactionAmount,
          status: "Pending",
          paidDate: DateTime.now().toISO(),
        });
      }
      setPayments(dataPayment);

      const resCreditCards = (await SubscriptionServices.getCreditcards()) as CreditCardInterface[];
      const dataCreditCards = resCreditCards.map((c) => {
        delete c.id;
        delete c.userId;
        delete c.updatedAt;
        delete c.createdAt;
        delete c.deletedAt;
        return c;
      });
      setCreditCards(dataCreditCards);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  }

  return (
    <>
      <Header
        before={[]}
        main={`Assinatura - ${subscription.reason}`}
        button={createButton}
        back={back}
      />
      {showAlert && <Alert alert={showAlert} setAlert={setShowAlert} />}
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center overflow-hidden p-2">
          <div className="w-full">
            <div className="bg-white shadow-sm rounded">
              {list && (
                <>
                  <ListPayments payments={payments} />
                  <ListCreditCards creditCards={creditCards} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscriptions;
