import { ModulesEnum } from "./enum";
import { ModulesInterface } from "./interfaces";

export const Modules: ModulesInterface[] = [
  {
    name: ModulesEnum.auth,
    singular: "Autenticação",
    plural: "Autenticações",
    routes: {
      signIn: "/entrar",
      forgotPassword: "/esqueceu-senha",
      changePassword: "/mudar-senha",
      signUp: "/cadastrar",
      plans: "/planos",
      subscription: "/assinar",
    },
    menu: [],
  },
  {
    name: ModulesEnum.dashboards,
    singular: "Relatório",
    plural: "Relatórios",
    routes: {
      dashboards: "/relatorios",
      places: "/relatorios/escritorios",
      process: "/relatorios/processos",
    },
    menu: [
      {
        name: "Relatórios",
        icon: "DashboardIcon",
        subItems: [
          {
            name: "Escritórios",
            link: "/relatorios/escritorios",
          },
          {
            name: "Processos",
            link: "/relatorios/processos",
          },
        ],
      },
    ],
  },
  {
    name: ModulesEnum.subscriptions,
    singular: "Assinatura",
    plural: "Assinaturas",
    routes: {
      subscription: "/assinatura",
    },
    menu: [],
  },
  {
    name: ModulesEnum.profiles,
    singular: "Perfil",
    plural: "Perfis",
    routes: {
      profile: "/perfil",
    },
    menu: [],
  },
  {
    name: ModulesEnum.places,
    singular: "Escritório",
    plural: "Escritórios",
    routes: {
      list: "/escritorios",
      add: "/escritorios/adicionar",
      update: "/escritorios/alterar",
      details: "/escritorios",
    },
    menu: [
      {
        name: "Escritórios",
        icon: "PlacesIcon",
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
    name: ModulesEnum.members,
    singular: "Colaborador",
    plural: "Colaboradores",
    routes: {
      list: "/colaboradores",
      add: "/colaboradores/adicionar",
      update: "/colaboradores/alterar",
      details: "/colaboradores",
      invite: "/convite"
    },
    menu: [
      {
        name: "Colaboradores",
        icon: "MembersIcon",
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
    name: ModulesEnum.businessContacts,
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
        icon: "BusinessContactsIcon",
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
    name: ModulesEnum.notes,
    singular: "Nota",
    plural: "Notas",
    menu: [],
  },
  {
    name: ModulesEnum.attachments,
    singular: "Anexo",
    plural: "Anexos",
    menu: [],
  },
  {
    name: ModulesEnum.schedule,
    singular: "Eventos",
    plural: "Evento",
    routes: {
      calendar: "/calendario",
      schedule: "/agenda",
    },
    menu: [
      {
        name: "Agenda",
        icon: "ScheduleIcon",
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
    name: ModulesEnum.financial,
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
        icon: "FinancialIcon",
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
