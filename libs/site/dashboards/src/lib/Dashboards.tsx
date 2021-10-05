import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Header,
  InfoCard,
  INFOCARDSICONS,
} from "@iustitia/site/shared-components";
import { PlacesServices } from "@iustitia/site/services";

import { GetRoutes, ModulesEnum, DashboardsRoutesInterface } from "@iustitia/modules";
import { PeopleIcon } from "@iustitia/site/icons";

const dashboardsRoutes = GetRoutes(ModulesEnum.dashboards) as DashboardsRoutesInterface;

type PlacesType = PlacesServices.PlacesRes;

export function Dashboards() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [offices, setOffices] = useState<PlacesType[]>();
  const [selectedOffice, setSelectedOffice] = useState({} as PlacesType);

  useEffect(() => {
    if (id) getOffice(id);
    else getOffices();
  }, [id]);

  async function getOffice(id: string) {
    try {
      const office = (await PlacesServices.getOne({ id })) as PlacesType;
      setSelectedOffice(office);
    } catch (err) {
      console.log(err);
    }
  }

  async function getOffices() {
    try {
      const data = (await PlacesServices.getAll()) as PlacesType[];
      setOffices(data);
      if (data.length === 1) setSelectedOffice(data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const selectOffices = () => {
    return (
      <select
        id="offices"
        className={`rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 focus:ring-primary-500 border-gray-300`}
        onChange={(e) => {
          if (e.target.value) {
            history.push(`${dashboardsRoutes.places}/${e.target.value}`);
          } else {
            history.push(dashboardsRoutes.dashboards);
          }
        }}
      >
        {offices && offices.length > 1 ? (
          <>
            <option value="">TODOS</option>
            {offices.map((office, i) => (
              <option key={i} value={office.id}>
                {office.name}
              </option>
            ))}
          </>
        ) : (
          offices &&
          offices[0]?.name && <option value="">{offices[0].name}</option>
        )}
      </select>
    );
  };

  return (offices && offices?.length > 0) || selectedOffice ? (
    <div className="mb-10 container mx-auto">
      <Header
        before={["Dashboards"]}
        main={selectedOffice.name ? `${selectedOffice.name}` : `Escritórios`}
        select={offices && offices.length > 1 ? selectOffices : undefined}
      />

      <div className="p-4 flex flex-col space-y-4">
        <section className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-wrap items-center justify-between mb-4 space-y-1">
            <h2 className="text-base font-bold">Visão geral Analítica</h2>
            <label>
              <select className="text-xs rounded border text-gray-500 border-gray-300">
                <option>Últimos 7 Dias</option>
                <option>Últimos 30 Dias</option>
              </select>
            </label>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border border-gray-300 rounded">
              <div className="flex items-start justify-between">
                <h2 className="mb-2 font-mono text-2xl font-light leading-none text-gray-900 truncate">
                  23,455
                </h2>
                <span className="flex items-center space-x-1 text-sm  leading-none text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-none w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>40%</span>
                </span>
              </div>
              <p className="text-sm leading-none text-gray-600">Pesquisas</p>
            </div>
            <div className="p-4 border border-gray-300 rounded">
              <div className="flex items-start justify-between">
                <h2 className="mb-2 font-mono text-2xl font-light leading-none text-gray-900 truncate">
                  55
                </h2>
                <span className="flex items-center space-x-1 text-sm  leading-none text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-none w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>240%</span>
                </span>
              </div>
              <p className="text-sm leading-none text-gray-600">Documentos</p>
            </div>
            <div className="p-4 border border-gray-300 rounded">
              <div className="flex items-start justify-between">
                <h2 className="mb-2 font-mono text-2xl font-light leading-none text-gray-900 truncate">
                  129,752
                </h2>
                <span className="flex items-center space-x-1 text-sm  leading-none text-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-none w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>22%</span>
                </span>
              </div>
              <p className="text-sm leading-none text-gray-600">Atividades</p>
            </div>
            <div className="p-4 border border-gray-300 rounded">
              <div className="flex items-start justify-between">
                <h2 className="mb-2 font-mono text-2xl font-light leading-none text-gray-900 truncate">
                  1,255
                </h2>
                <span className="flex items-center space-x-1 text-sm  leading-none text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-none w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>10%</span>
                </span>
              </div>
              <p className="text-sm leading-none text-gray-600">
                Recomendações
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-flow-rows grid-cols-4 gap-4">
          <InfoCard
            title="Clientes Ativos"
            content="0"
            badge="0%"
            badgeColor="gray"
            icon={INFOCARDSICONS.PEOPLE}
          />

          <InfoCard
            title="Processos Ativos"
            content="0"
            badge="0%"
            badgeColor="gray"
            icon={INFOCARDSICONS.CASE}
          />

          <InfoCard
            title="Entradas"
            content="$0"
            badge="0%"
            badgeColor="gray"
            icon={INFOCARDSICONS.MONEY}
          />

          <InfoCard
            title="Despesas"
            content="$0"
            badge="0%"
            badgeColor="gray"
            icon={INFOCARDSICONS.GRAPH_UP}
          />

          <div className="flex flex-col items-center justify-center bg-white rounded-md shadow">
            <PeopleIcon styles="w-12 h-12 text-primary-400" stroke={2} />
            <h2 className="title-font  text-3xl text-gray-900">
              {selectedOffice
                ? `${selectedOffice.managersOffice?.length}`
                : `0`}
            </h2>
            <p className="leading-relaxed">Responsáveis</p>
          </div>

          <div className="p-4 flex flex-col items-center justify-center bg-white rounded-md shadow">
            <PeopleIcon styles="w-12 h-12 text-primary-400" stroke={2} />
            <h2 className="title-font  text-3xl text-gray-900">
              {selectedOffice ? `${selectedOffice.usersOffice?.length}` : `0`}
            </h2>
            <p className="leading-relaxed">Usuários</p>
          </div>

          <div className="flex flex-col justify-between rounded-lg shadow bg-white">
            <div className="p-5">
              <p className="mb-2 text-base font-semibold leading-none tracking-wide text-gray-500 uppercase">
                Despesas
              </p>
              <h2 className="mx-5 text-3xl font-bold leading-none text-red-800 truncate">
                R$ 562,00
              </h2>
            </div>
            <p className="px-5 py-2  text-center text-sm  bg-red-300 text-gray-900 rounded-b-lg hover:text-black">
              Acompanhar Despesas
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-lg shadow bg-white">
            <div className="p-5">
              <p className="mb-2 text-base font-semibold leading-none tracking-wide text-gray-500 uppercase">
                Entradas
              </p>
              <h2 className="mx-5 text-3xl font-bold leading-none text-green-800 truncate">
                R$ 562,00
              </h2>
            </div>
            <p className="px-5 py-2  text-center text-sm  bg-green-300 text-gray-900 rounded-b-lg hover:text-black">
              Acompanhar Entradas
            </p>
          </div>

          <div className="bg-white shadow rounded-lg flex flex-row items-center p-5 card">
            <div className="flex items-center justify-center w-10 h-10 text-pink-700 bg-pink-100 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-none w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h2 className="mb-1 text-lg font-bold leading-none text-gray-900 truncate">
                563
              </h2>
              <p className="text-sm leading-none text-gray-600">
                Emails Enviados
              </p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg flex flex-row items-center p-5 card">
            <div className="flex items-center justify-center w-10 h-10 text-green-700 bg-green-100 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-none w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h2 className="mb-1 text-lg font-bold leading-none text-gray-900 truncate">
                62
              </h2>
              <p className="text-sm leading-none text-gray-600">Sucessos</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg flex flex-row items-center p-5 card">
            <div className="flex items-center justify-center w-10 h-10 text-red-700 bg-red-100 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-none w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h2 className="mb-1 text-lg font-bold leading-none text-gray-900 truncate">
                24
              </h2>
              <p className="text-sm leading-none text-gray-600">Falhas</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg flex flex-row items-center p-5 card">
            <div className="flex items-center justify-center w-10 h-10 text-yellow-700 bg-yellow-100 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-none w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h2 className="mb-1 text-lg font-bold leading-none text-gray-900 truncate">
                12,655
              </h2>
              <p className="text-sm leading-none text-gray-600">
                Pesquisas realizadas
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-row space-x-4">
          <div className="bg-white shadow border border-gray-300 rounded h-full w-1/3">
            <div className="px-4 py-3">
              <h4>Estatísticas do Processo</h4>
            </div>
            <div className="px-4 mb-1 -mt-2 divide-y divide-gray-200 card-body">
              <div className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-none w-5 h-5"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Reunioes</span>
                </div>
                <span className="font-mono text-gray-900">132</span>
              </div>
              <div className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-none w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Emails</span>
                </div>
                <span className="font-mono text-gray-900">32,422</span>
              </div>
              <div className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-none w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Visitas</span>
                </div>
                <span className="font-mono text-gray-900">10</span>
              </div>
              <div className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-none w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Finalizacoes</span>
                </div>
                <span className="font-mono text-green-800 bg-green-200 rounded-full px-2">
                  12
                </span>
              </div>
              <div className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-none w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Fechamentos</span>
                </div>
                <span className="font-mono text-red-700 bg-red-200 rounded-full px-2">
                  32
                </span>
              </div>
            </div>
            <p className="cursor-pointer px-4 py-3 text-sm bg-primary-300 rounded-b">
              Mais Informacoes
            </p>
          </div>

          <div className="bg-white shadow border border-gray-300 rounded h-full w-1/3">
            <div className="flex-1 p-6">
              <div className="flex items-center justify-center space-x-2">
                <div className="rounded-full w-16 h-16">
                  <img
                    src="https://iustitia-io-avatars.s3.amazonaws.com/45ae093eae54441f8556bab9910e466815457571.jpeg"
                    alt="Guga"
                    className="rounded-full w-16 h-16"
                  />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-900">
                    Guga Zimmermann
                  </h4>
                  <p className="text-sm  leading-none text-gray-600">
                    CEO of Iustitia
                  </p>
                </div>
              </div>
              <div className="flex py-2 my-4 text-center border-t border-b border-gray-200 divide-x divide-gray-200">
                <div className="flex-1 p-2">
                  <h5 className="text-sm font-bold text-gray-900">200</h5>
                  <p className="text-sm  leading-none text-gray-600">
                    Processos
                  </p>
                </div>
                <div className="flex-1 p-2">
                  <h5 className="text-sm font-bold text-gray-900">46</h5>
                  <p className="text-sm  leading-none text-gray-600">
                    Clientes
                  </p>
                </div>
                <div className="flex-1 p-2">
                  <h5 className="text-sm font-bold text-gray-900">12,340</h5>
                  <p className="text-sm  leading-none text-gray-600">
                    Reunioes
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis laboriosam.
              </p>
            </div>
            <p className="px-4 py-3 text-sm bg-primary-300 rounded-b cursor-pointer">
              Ver Todas as Informacoes
            </p>
          </div>

          <div className="bg-white shadow border border-gray-300 rounded h-full w-1/3">
            <nav className="flex space-x-4 text-sm border-b border-gray-300">
              <p className="px-2 py-2 bg-primary-300 border-b border-primary-300">
                Clientes
              </p>
              <p className="px-2 py-2 cursor-pointer ">Processos</p>
              <p className="px-2 py-2 cursor-pointer">Contatos</p>
            </nav>
            <div className="flex-1 overflow-y-auto">
              <div className="cursor-pointer flex items-center justify-between w-full px-4 py-2 bg-white hover:bg-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="avatar avatar-xs">
                    <img
                      src="https://iustitia-io-avatars.s3.amazonaws.com/45ae093eae54441f8556bab9910e466815457571.jpeg"
                      alt="Cliente"
                      className="rounded-full w-8 h-8"
                    />
                  </div>
                  <p className="text-xs  text-left text-gray-800">
                    Cliente por Advogado
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="flex-none w-4 h-4 text-gray-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="cursor-pointer flex items-center justify-between w-full px-4 py-2 bg-gray-100 hover:bg-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="avatar avatar-xs">
                    <img
                      src="https://iustitia-io-avatars.s3.amazonaws.com/45ae093eae54441f8556bab9910e466815457571.jpeg"
                      alt="Cliente"
                      className="rounded-full w-8 h-8"
                    />
                  </div>
                  <p className="text-xs  text-left text-gray-800">
                    Cliente por Advogado
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="flex-none w-4 h-4 text-gray-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="cursor-pointer flex items-center justify-between w-full px-4 py-2 bg-white hover:bg-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="avatar avatar-xs">
                    <img
                      src="https://iustitia-io-avatars.s3.amazonaws.com/45ae093eae54441f8556bab9910e466815457571.jpeg"
                      alt="Cliente"
                      className="rounded-full w-8 h-8"
                    />
                  </div>
                  <p className="text-xs  text-left text-gray-800">
                    Cliente por Advogado
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="flex-none w-4 h-4 text-gray-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="cursor-pointer flex items-center justify-between w-full px-4 py-2 bg-gray-100 hover:bg-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="avatar avatar-xs">
                    <img
                      src="https://iustitia-io-avatars.s3.amazonaws.com/45ae093eae54441f8556bab9910e466815457571.jpeg"
                      alt="Cliente"
                      className="rounded-full w-8 h-8"
                    />
                  </div>
                  <p className="text-xs  text-left text-gray-800">
                    Cliente por Advogado
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="flex-none w-4 h-4 text-gray-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-between px-4 py-3 text-sm bg-primary-300 rounded-b cursor-pointer">
              <span>Mais Informacoes</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-none w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default Dashboards;
