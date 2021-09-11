import { WARNINGTYPES } from "@iustitia/site/shared-utils";
import { useState, useEffect } from "react";
import ConfirmationModal from "../../components/dashboard/confirmation-modal/ConfirmationModal";
import Header from "../../components/dashboard/header/Header";
import { IOffice } from "../../interfaces";
import {
  getAll,
  createOffice,
  updateOffice,
  deleteOffice,
} from "../../services/office";
import Form from "./form/Form";
import List from "./list/List";

interface OfficesProps {
  setOffices?(offices: IOffice[]): void;
}

export function Offices({ setOffices: CallOutOffices }: OfficesProps) {
  const [offices, setOffices] = useState([] as IOffice[]);
  const [selectedOffice, setSelectedOffice] = useState({} as IOffice);
  const [list, setList] = useState(true);
  const [create, setCreate] = useState(false);
  const [update, setUpdade] = useState(false);
  const [back, setBack] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    getOffices();
    setList(true);
    setUpdade(false);
    setCreate(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function showList() {
    await getOffices();
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
        {back ? "Voltar" : "Adicionar"}
      </button>
    );
  };

  async function getOffices() {
    try {
      const data = await getAll();
      const offices: IOffice[] = data.map((o: IOffice) => {
        delete o.userId;
        delete o.tenantId;
        delete o.updatedAt;
        delete o.createdAt;
        return o;
      });
      setOffices(offices as IOffice[]);
      if (CallOutOffices) CallOutOffices(offices as IOffice[]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCreateOffice(data: IOffice) {
    try {
      await createOffice(data);
      showList();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpateOffice(data: IOffice) {
    try {
      await updateOffice(data);
      showList();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteOffice() {
    if (selectedOffice.id) {
      try {
        const deleted = await deleteOffice(selectedOffice.id);
        await getOffices();
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <Header
        before={[]}
        main="Escritórios"
        button={createButton}
        back={back}
      />
      {list && (
        <List
          offices={offices}
          setBack={setBack}
          setSelectedOffice={setSelectedOffice}
          setUpdade={setUpdade}
          setList={setList}
          setConfirm={setConfirm}
        />
      )}
      {create && <Form createOffice={handleCreateOffice} />}
      {update && (
        <Form office={selectedOffice} updateOffice={handleUpateOffice} />
      )}
      {confirm && (
        <ConfirmationModal
          setConfirm={setConfirm}
          type={WARNINGTYPES.ERROR}
          title={`Excluir Escritório: ${selectedOffice.name}?`}
          content={`Você tem certeza que quer excluir o escritório ${selectedOffice.name}? Todos os dados desse escritório serão perdidos. Essa ação não poderá ser desfeita.`}
          action={handleDeleteOffice}
        />
      )}
    </>
  );
}

export default Offices;
