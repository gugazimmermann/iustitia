import { Link, useHistory } from "react-router-dom";
import { FormatAddress, LoadingButton } from "@iustitia/site/shared-components";
import { ModulesEnum, GetRoutes, BCRoutesInterface } from "@iustitia/modules";
import { BusinessContactsServices } from "@iustitia/site/services";

const BCRoutes = GetRoutes(ModulesEnum.businessContacts) as BCRoutesInterface;

type BCCompaniesType = BusinessContactsServices.BCCompaniesRes;

export interface DetailsProps {
  loading: boolean;
  data: BCCompaniesType;
  setConfirm(confirm: boolean): void;
}

export function Details({ loading, data, setConfirm }: DetailsProps) {
  const history = useHistory();

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between py-2">
        <div></div>
        <div className="flex space-x-2  justify-center md:justify-end">
          <button
            type="button"
            onClick={() =>
              history.push(`${BCRoutes.updateCompany}/${data?.id}`)
            }
            className="px-2 py-1 text-xs text-white rounded-md bg-yellow-500 hover:bg-yellow-900 focus:ring-yellow-500"
          >
            Editar
          </button>
          <LoadingButton
            styles="px-2 py-1 text-xs text-white rounded-md bg-red-500 hover:bg-red-900 focus:ring-red-500"
            loadingStyles="h-4 w-4"
            type="button"
            text="Remover"
            loading={loading}
            action={() => setConfirm(true)}
          />
        </div>
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
            {data.site && (
              <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="col-span-3 font-bold">Site</p>
                <p className="col-span-9">
                  <a
                    href={data.site}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {data.site}
                  </a>
                </p>
              </div>
            )}
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
            {data.contacts && data.contacts.length > 0 && (
              <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="col-span-3 font-bold">Contatos</p>
                <p className="col-span-9">
                  {data.contacts.map((c, i) => {
                    return (
                      <Link
                        key={i}
                        to={`${BCRoutes.detailsPerson}/${c.id}`}
                        className="underline"
                      >
                        {c.name} {data.name && c.position && ` - `} {c.position}
                      </Link>
                    );
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
