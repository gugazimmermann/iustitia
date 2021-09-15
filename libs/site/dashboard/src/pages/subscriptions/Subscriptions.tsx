import { DateTime } from "luxon";
import { Alert } from "@iustitia/site/shared-components";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import { useState, useEffect } from "react";
import ConfirmationModal from "../../components/dashboard/confirmation-modal/ConfirmationModal";
import Header from "../../components/dashboard/header/Header";
import {
  ICreditCard,
  IOffice,
  IPayment,
  ISubscription,
} from "../../interfaces";
import {
  getPlans,
  getSubscription,
  getPayments,
  getCreditcards,
} from "../../services/subscriptions";
import Form from "./form/Form";
import ListPayments from "./list/ListPayments";
import ListCreditCards from "./list/ListCreditCards";

export function Subscriptions() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState({} as ISubscription);
  const [payments, setPayments] = useState([] as IPayment[]);
  const [creditCards, setCreditCards] = useState([] as ICreditCard[]);
  const [selectedCreditCard, setSelectedCreditCard] = useState(
    {} as ICreditCard
  );
  const [selectedOffice, setSelectedOffice] = useState({} as IOffice);
  const [list, setList] = useState(true);
  const [create, setCreate] = useState(false);
  const [update, setUpdade] = useState(false);
  const [back, setBack] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    populateData();
    setList(true);
    setUpdade(false);
    setCreate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function showList() {
    // await getOffices();
    setList(true);
    setUpdade(false);
    setCreate(false);
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
            setCreate(true);
            setList(false);
            setUpdade(false);
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
      const dataSubscription: ISubscription = await getSubscription();
      delete dataSubscription.id;
      delete dataSubscription.userId;
      delete dataSubscription.updatedAt;
      delete dataSubscription.createdAt;
      delete dataSubscription.deletedAt;
      setSubscription(dataSubscription);

      const resPayment: IPayment[] = await getPayments();
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

      const resCreditCards: ICreditCard[] = await getCreditcards();
      const dataCreditCards = resCreditCards.map((c) => {
        delete c.id;
        delete c.userId;
        delete c.updatedAt;
        delete c.createdAt;
        delete c.deletedAt;
        return c;
      });
      setCreditCards(dataCreditCards);
    } catch (err) {
      console.log(err);
    }
  }

  // async function handleCreateOffice(data: IOffice) {
  //   setLoading(true);
  //   try {
  //     await createOffice(data);
  //     setShowSuccess(true);
  //     setShowEdit(false);
  //     setShowDelete(false);
  //     showList();
  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err);
  //   }
  // }

  // async function handleUpateOffice(data: IOffice) {
  //   setLoading(true);
  //   try {
  //     await updateOffice(data);
  //     setShowSuccess(false);
  //     setShowEdit(true);
  //     setShowDelete(false);
  //     showList();
  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err);
  //   }
  // }

  // async function handleDeleteOffice() {
  //   if (selectedOffice.id) {
  //     setLoading(true);
  //     try {
  //       await deleteOffice(selectedOffice.id);
  //       setShowSuccess(false);
  //       setShowEdit(false);
  //       setShowDelete(true);
  //       await getOffices();
  //       setLoading(false);
  //     } catch (err) {
  //       setLoading(false);
  //       console.log(err);
  //     }
  //   }
  // }

  return (
    <>
      <Header
        before={[]}
        main={`Assinatura - ${subscription.reason}`}
        button={createButton}
        back={back}
      />
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center overflow-hidden p-2">
          <div className="w-full">
            <div className="bg-white shadow-sm rounded">
              {/* {showSuccess && (
                <Alert
                  type={ALERT_TYPES.SUCCESS}
                  message="Escritório cadastrado com Sucesso!"
                  closeFunction={setShowSuccess}
                />
              )}
              {showEdit && (
                <Alert
                  type={ALERT_TYPES.INFO}
                  message="Escritório alterado com Sucesso!"
                  closeFunction={setShowEdit}
                />
              )}
              {showDelete && (
                <Alert
                  type={ALERT_TYPES.WARNING}
                  message="Escritório removido com Sucesso!"
                  closeFunction={setShowDelete}
                />
              )} */}
              {list && (
                <>
                  <ListPayments payments={payments} />
                  <ListCreditCards
                    creditCards={creditCards}
                    setSelectedCreditCard={setSelectedCreditCard}
                    setBack={setBack}
                    setUpdade={setUpdade}
                    setList={setList}
                    setConfirm={setConfirm}
                  />
                </>
              )}
              {/* {create && (
                <Form loading={loading} createOffice={handleCreateOffice} />
              )}
              {update && (
                <Form
                  loading={loading}
                  office={selectedOffice}
                  updateOffice={handleUpateOffice}
                />
              )}
              {confirm && (
                <ConfirmationModal
                  setConfirm={setConfirm}
                  type={WARNING_TYPES.ERROR}
                  title={`Excluir Escritório: ${selectedOffice.name}?`}
                  content={`Você tem certeza que quer excluir o escritório ${selectedOffice.name}? Todos os dados desse escritório serão perdidos. Essa ação não poderá ser desfeita.`}
                  action={handleDeleteOffice}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscriptions;
