import { BCRoutesInterface } from "@iustitia/modules";
import { BusinessContactsServices } from "@iustitia/site/services";

type BCPersonsType = BusinessContactsServices.BCPersonsRes;
type BCTypes = BusinessContactsServices.BCTypes;

export function seeType(pathname: string) {
  const pathType = pathname.split("/");
  if (pathType.includes("clientes")) return "Clientes";
  else if (pathType.includes("contatos")) return "Contatos";
  return "Fornecedores";
}

export function getRouteType(
  BCRoutes: BCRoutesInterface,
  selectedType: string | undefined
) {
  switch (selectedType) {
    case "Clientes": {
      return {
        list: BCRoutes.listPersons,
        details: BCRoutes.detailsPerson,
        add: BCRoutes.addPerson,
        update: BCRoutes.updatePerson,
      }
    }
    case "Contatos": {
      return {
        list: BCRoutes.listContacts,
        details: BCRoutes.detailsContact,
        add: BCRoutes.addContact,
        update: BCRoutes.updateContact,
      }
    }
    case "Fornecedores": {
      return {
        list: BCRoutes.listSuppliers,
        details: BCRoutes.detailsSupplier,
        add: BCRoutes.addSupplier,
        update: BCRoutes.updateSupplier,
      }
    }
    default: {
      return {
        list: BCRoutes.listPersons,
        details: BCRoutes.detailsPerson,
        add: BCRoutes.addPerson,
        update: BCRoutes.updatePerson,
      }
    }
  }
}

export function filterOnwer(data: BCPersonsType[], owner: string, id: string) {
  let res: BCPersonsType[] = [];
  if (owner === "All") {
    res = data;
  } else if (owner === "Personal") {
    res = data.filter(d => d.onwers?.some(o => o.id === id));
  } else {
    res = data.filter(d => d.onwers?.some(o => o.id === owner));
  }
  return res;
}

export function seeTypeText(type: BCTypes | undefined) {
  if (type) {
    if (type === "Clientes") return "Cliente";
    else if (type === "Contatos") return "Contato";
    return "Fornecedor";
  }
  return null;
}
