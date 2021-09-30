import {DashboardIcon, PeopleIcon} from "@iustitia/site/icons";
import { SiteModulesInterface } from "./interfaces";
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
        icon: <PeopleIcon styles="w-5 h-5" stroke={2} />,
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
    name: SiteModules.dashboard,
    singular: "Relatório",
    plural: "Relatórios",
    menu: [
      {
        name: "Relatórios",
        icon: <DashboardIcon styles="w-5 h-5" stroke={2} />,

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
        icon: <PeopleIcon styles="w-5 h-5" stroke={2} />,
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
        icon: <PeopleIcon styles="w-5 h-5" stroke={2} />,
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
        icon: <PeopleIcon styles="w-5 h-5" stroke={2} />,
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
        icon: <PeopleIcon styles="w-5 h-5" stroke={2} />,
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
