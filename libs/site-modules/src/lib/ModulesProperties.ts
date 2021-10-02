import { SiteModulesInterface } from "@iustitia/interfaces";
import SiteModules from "./SiteModulesEnum";

export const ModulesProperties: SiteModulesInterface[] = [
  {
    name: SiteModules.auth,
    singular: "Autenticação",
    plural: "Autenticações",
    menu: [],
  },
  {
    name: SiteModules.subscriptions,
    singular: "Assinatura",
    plural: "Assinaturas",
    menu: [],
  },
  {
    name: SiteModules.profiles,
    singular: "Perfil",
    plural: "Perfis",
    menu: [],
  },
  {
    name: SiteModules.members,
    singular: "Colaborador",
    plural: "Colaboradores",
    menu: [
      {
        name: "Colaboradores",
        icon: "PeopleIcon",
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
    name: SiteModules.dashboards,
    singular: "Relatório",
    plural: "Relatórios",
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
    name: SiteModules.places,
    singular: "Escritório",
    plural: "Escritórios",
    menu: [
      {
        name: "Escritórios",
        icon: "PeopleIcon",
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
    name: SiteModules.businessContacts,
    singular: "Cadastro",
    plural: "Cadastros",
    menu: [
      {
        name: "Cadastros",
        icon: "PeopleIcon",
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
    name: SiteModules.notes,
    singular: "Nota",
    plural: "Notas",
    menu: [],
  },
  {
    name: SiteModules.attachments,
    singular: "Anexo",
    plural: "Anexos",
    menu: [],
  },
  {
    name: SiteModules.schedule,
    singular: "Eventos",
    plural: "Evento",
    menu: [
      {
        name: "Agenda",
        icon: "PeopleIcon",
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
    name: SiteModules.financial,
    singular: "Registros Financeiros",
    plural: "Registro Financeiro",
    menu: [
      {
        name: "Financeiro",
        icon: "PeopleIcon",
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

export default ModulesProperties;
