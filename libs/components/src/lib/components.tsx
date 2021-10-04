import {
  AuthRoutesInterface,
  BusinessContactsRoutesInterface,
  ComponentsInterface,
  DashboardsRoutesInterface,
  FinancialRoutesInterface,
  MembersRoutesInterface,
  MenuItemInterface,
  PlacesRoutesInterface,
  ProfilesRoutesInterface,
  ScheduleRoutesInterface,
  SubscriptionsRoutesInterface,
} from "@iustitia/interfaces";
import { DashboardIcon } from "@iustitia/site/icons";

export enum ComponentsEnum {
  auth = "auth",
  dashboards = "dashboards",
  subscriptions = "subscriptions",
  profiles = "profiles",
  places = "places",
  members = "members",
  businessContacts = "business-contacts",
  notes = "notes",
  attachments = "attachments",
  schedule = "schedule",
  financial = "financial",
}

export function GetComponent(
  name: ComponentsEnum
): ComponentsInterface | undefined {
  const component = Components.find((c) => c.name === name);
  return component ? component : undefined;
}

export const Components: ComponentsInterface[] = [
  {
    name: ComponentsEnum.auth,
    singular: "Autenticação",
    plural: "Autenticações",
    routes: {
      signIn: "/entrar",
      forgotPassword: "/esqueceu-senha",
      changePassword: "/mudar-senha/:urlcode?",
      signUp: "/cadastrar",
      plans: "/planos",
      subscription: "/assinar",
    },
    menu: [],
  },
  {
    name: ComponentsEnum.dashboards,
    singular: "Relatório",
    plural: "Relatórios",
    routes: {
      dashboards: "/relatorios",
      places: "/relatorios/escritorios/:id?",
      process: "/relatorios/processos/:id?",
    },
    menu: [
      {
        name: "Relatórios",
        icon: "DashboardIcon",
        subItems: [
          {
            name: "Escritórios",
            link: "relatorio/escritorios",
          },
          {
            name: "Processos",
            link: "relatorio/processos",
          },
        ],
      },
    ],
  },
  {
    name: ComponentsEnum.subscriptions,
    singular: "Assinatura",
    plural: "Assinaturas",
    routes: {
      subscription: "/assinatura",
    },
    menu: [],
  },
  {
    name: ComponentsEnum.profiles,
    singular: "Perfil",
    plural: "Perfis",
    routes: {
      profile: "/perfil",
    },
    menu: [],
  },
  {
    name: ComponentsEnum.places,
    singular: "Escritório",
    plural: "Escritórios",
    routes: {
      list: "/escritorios",
      add: "/escritorios/adicionar",
      update: "/escritorios/alterar/:id",
      details: "/escritorios/:id?",
    },
    menu: [
      {
        name: "Escritórios",
        icon: "DashboardIcon",
        subItems: [
          {
            name: "Escritórios",
            link: "/escritorios",
          },
        ],
      },
    ],
  },
  {
    name: ComponentsEnum.members,
    singular: "Colaborador",
    plural: "Colaboradores",
    routes: {
      list: "/colaboradores",
      add: "/colaboradores/adicionar",
      update: "/colaboradores/alterar/:id",
      details: "/colaboradores/:id?",
    },
    menu: [
      {
        name: "Colaboradores",
        icon: "DashboardIcon",
        subItems: [
          {
            name: "Colaboradores",
            link: "/colaboradores",
          },
          {
            name: "Permissões",
            link: "/colaboradores/permissoes",
          },
        ],
      },
    ],
  },
  {
    name: ComponentsEnum.businessContacts,
    singular: "Cadastro",
    plural: "Cadastros",
    routes: {
      listPersons: "/cadastros/pessoas",
      addPerson: "/cadastros/pessoas/adicionar",
      updatePerson: "/cadastros/pessoas/alterar/:id",
      detailsPerson: "/cadastros/pessoas/:id?",
      listCompanies: "/cadastros/empresas",
      addCompany: "/cadastros/empresas/adicionar",
      updateCompany: "/cadastros/empresas/alterar/:id",
      detailsCompany: "/cadastros/empresas/:id?",
    },
    menu: [
      {
        name: "Cadastros",
        icon: "DashboardIcon",
        subItems: [
          {
            name: "Clientes",
            link: "/cadastros/clientes",
          },
          {
            name: "Contatos",
            link: "/cadastros/contatos",
          },
          {
            name: "Fornecedores",
            link: "/cadastros/fornecedores",
          },
          {
            name: "Empresas",
            link: "/cadastros/empresas",
          },
        ],
      },
    ],
  },
  {
    name: ComponentsEnum.notes,
    singular: "Nota",
    plural: "Notas",
    menu: [],
  },
  {
    name: ComponentsEnum.attachments,
    singular: "Anexo",
    plural: "Anexos",
    menu: [],
  },
  {
    name: ComponentsEnum.schedule,
    singular: "Eventos",
    plural: "Evento",
    routes: {
      calendar: "/calendario",
      schedule: "/agenda",
    },
    menu: [
      {
        name: "Agenda",
        icon: "DashboardIcon",
        subItems: [
          {
            name: "Calendário",
            link: "/eventos/calendario",
          },
          {
            name: "Agenda",
            link: "/eventos/agenda",
          },
        ],
      },
    ],
  },
  {
    name: ComponentsEnum.financial,
    singular: "Registros Financeiros",
    plural: "Registro Financeiro",
    routes: {
      list: "/financeiro",
      add: "/financeiro/adicionar",
      update: "/financeiro/alterar/:id",
      details: "/financeiro/:id?",
    },
    menu: [
      {
        name: "Financeiro",
        icon: "DashboardIcon",
        subItems: [
          {
            name: "Fluxo de Caixa",
            link: "/financeiro/fluxo-de-caixa",
          },
        ],
      },
    ],
  },
];

export function GetComponentRoutes(
  name: ComponentsEnum
):
  | AuthRoutesInterface
  | DashboardsRoutesInterface
  | SubscriptionsRoutesInterface
  | ProfilesRoutesInterface
  | PlacesRoutesInterface
  | MembersRoutesInterface
  | BusinessContactsRoutesInterface
  | ScheduleRoutesInterface
  | FinancialRoutesInterface
  | undefined {
  const component = GetComponent(name);
  if (component && component.routes) return component.routes;
  return undefined;
}

export function GetComponentMenu(): MenuItemInterface[] {
  const menuItems: MenuItemInterface[] = [];
  for (const component of Components)
    if (component.menu) component.menu.map((m) => menuItems.push(m));
  return menuItems;
}

