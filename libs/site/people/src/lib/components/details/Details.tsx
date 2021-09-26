import { useState } from "react";
import { WARNING_TYPES } from "@iustitia/site/shared-utils";
import {
  Alert,
  FormatAddress,
} from "@iustitia/site/shared-components";
import { ProfileServices } from "@iustitia/site/services";

export interface DetailsProps {
  data: ProfileServices.ProfileInterface;
  edit(): void;
}

export function Details({ data, edit }: DetailsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <>
      {error && <Alert type={WARNING_TYPES.ERROR} message={error} />}
      <div className="mb-6 grid grid-cols-12 items-center justify-center">
        <div className="col-span-full flex flex-col md:flex-row w-full items-center justify-start py-4 md:p-4 border-b">
           <div className="w-full">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h2 className=" text-base md:text-2xl font-bold">{data.name}</h2>
              <button
                disabled={loading}
                onClick={() => edit()}
                className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-full">
          {data.phone && (
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">Telefone</p>
              <p className="col-span-9">{data.phone}</p>
            </div>
          )}
          {data.email && (
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
          )}
          {(data.address ||
            data.number ||
            data.complement ||
            data.neighborhood ||
            data.city ||
            data.state ||
            data.zip) && (
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
          )}
        </div>
      </div>
    </>
  );
}

export default Details;
