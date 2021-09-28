import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormatAddress } from "@iustitia/site/shared-components";
import { OfficeInterface } from "../../Offices";
import { SiteRoutes } from "@iustitia/react-routes";

export interface DetailsProps {
  data: OfficeInterface;
  route: SiteRoutes;
  setConfirm(confirm: boolean): void;
}

export function Details({ data, route, setConfirm }: DetailsProps) {
  const history = useHistory();
  const [activeValue, setActiveValue] = useState(data.active);
  return (
    <>
      <div className="flex justify-end py-2 space-x-2">
        <button
          type="button"
          onClick={() => history.push(`${route}/edit/${data?.id}`)}
          className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => setActiveValue(!activeValue)}
          className={`px-2 py-1 text-xs text-white rounded-md ${
            activeValue
              ? `bg-green-500 hover:bg-green-800 focus:ring-green-500`
              : `bg-gray-500 hover:bg-gray-800 focus:ring-gray-500`
          } `}
        >
          {activeValue ? `Tornar Inativo` : `Tornar Ativo`}
        </button>
        <button
          type="button"
          onClick={() => setConfirm(true)}
          className="px-2 py-1 text-xs text-white rounded-md bg-red-500 hover:bg-red-900 focus:ring-red-500"
        >
          Remover
        </button>
      </div>
      <div className="bg-white shadow-sm rounded">
        <div className="mb-6 grid grid-cols-12 items-center justify-center">
          <div className="col-span-full flex flex-col md:flex-row w-full items-center justify-start py-4 md:p-4 border-b">
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <h2 className=" text-base md:text-2xl font-bold">
                  {data.name}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Telefone</p>
              <p className="col-span-9">{data.phone}</p>
            </div>
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">E-Mail</p>
              <p className="col-span-9">
                {data.email ? (
                  <a href={`mailto:${data.email}`} className="underline">
                    {data.email}
                  </a>
                ) : (
                  <span>{data.email}</span>
                )}
              </p>
            </div>
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Endereço</p>
              <FormatAddress
                address={data.address}
                number={data.number}
                complement={data.complement}
                neighborhood={data.neighborhood}
                city={data.city}
                state={data.state}
                zip={data.zip}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
