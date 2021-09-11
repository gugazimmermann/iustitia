import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAddressFromCEP, validateEmail } from "@iustitia/site/shared-utils";
import { IOffice } from "../../../interfaces";
import { LoadingButton } from "@iustitia/site/shared-components";

export interface FormProps {
  loading: boolean;
  office?: IOffice;
  createOffice?(office: IOffice): void;
  updateOffice?(office: IOffice): void;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  zip: yup.string().required().min(10).max(10),
  address: yup.string().required(),
  neighborhood: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
});

export function Form({ loading, office, createOffice, updateOffice }: FormProps) {
  const defaultValues = {
    name: office?.name || "",
    email: office?.email || "",
    phone: office?.phone || "",
    zip: office?.zip || "",
    address: office?.address || "",
    number: office?.number || "",
    complement: office?.complement || "",
    neighborhood: office?.neighborhood || "",
    city: office?.city || "",
    state: office?.state || "",
  };
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IOffice>({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const [validZip, setValidZip] = useState(!!defaultValues.zip);

  async function fetchCEP(zip: string) {
    try {
      const data = await getAddressFromCEP(zip);
      if (data) {
        setValidZip(true);
        clearErrors("zip");
        setValue("state", data.uf);
        clearErrors("state");
        setValue("address", data.rua);
        clearErrors("address");
        setValue("neighborhood", data.bairro);
        clearErrors("neighborhood");
        setValue("city", data.cidade);
        clearErrors("city");
      }
    } catch (err) {
      setValidZip(false);
      setError("zip", { type: "manual" });
      setValue("address", "");
      setValue("neighborhood", "");
      setValue("city", "");
      setValue("state", "");
    }
  }

  async function onSubmit(data: IOffice) {
    if (!validZip) {
      setError("zip", { type: "manual" });
      return;
    }
    if (data.email && !validateEmail(data.email)) {
      setError("email", { type: "manual" });
      return;
    }
    if (createOffice) {
      createOffice(data);
      return;
    }
    if (updateOffice) {
      if (!office?.id) {
        console.error("ID not found!")
        return;
      }
      data.id = office?.id
      updateOffice(data);
      return;
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-center overflow-hidden p-2">
        <div className="w-full">
          <div className="bg-white shadow-sm rounded">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col mx-auto"
            >
              <fieldset className="grid grid-cols-1 gap-4 p-4 ">
                <div className="grid grid-cols-12 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-4">
                    <label htmlFor="name" className="text-sm">
                      Nome *
                    </label>
                    <input
                      {...register("name")}
                      id="name"
                      type="text"
                      placeholder="Nome"
                      className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                        errors.name
                          ? `focus:ring-red-500 border-red-500`
                          : `focus:ring-primary-500 border-gray-300`
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-4">
                    <label htmlFor="name" className="text-sm">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="Email"
                      className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                        errors.email
                          ? `focus:ring-red-500 border-red-500`
                          : `focus:ring-primary-500 border-gray-300`
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-4">
                    <label htmlFor="name" className="text-sm">
                      Telefone
                    </label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => {
                        return (
                          <NumberFormat
                            {...field}
                            format="(##) #####-####"
                            id="phone"
                            type="text"
                            placeholder="Telefone"
                            control={control}
                            onValueChange={(c) => {
                              field.onChange(c.value);
                            }}
                            className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                              errors.phone
                                ? `focus:ring-red-500 border-red-500`
                                : `focus:ring-primary-500 border-gray-300`
                            }`}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="name" className="text-sm">
                      CEP *
                    </label>
                    <Controller
                      name="zip"
                      control={control}
                      render={({ field }) => {
                        return (
                          <NumberFormat
                            {...field}
                            format="##.###-###"
                            id="zip"
                            type="text"
                            placeholder="CEP"
                            control={control}
                            onValueChange={(c) => {
                              field.onChange(c.value);
                              fetchCEP(c.value);
                            }}
                            className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                              errors.zip
                                ? `focus:ring-red-500 border-red-500`
                                : `focus:ring-primary-500 border-gray-300`
                            }`}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-9">
                    <label htmlFor="name" className="text-sm">
                      Endereço *
                    </label>
                    <input
                      {...register("address")}
                      id="address"
                      type="text"
                      placeholder="Endereço"
                      className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                        errors.address
                          ? `focus:ring-red-500 border-red-500`
                          : `focus:ring-primary-500 border-gray-300`
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1">
                    <label htmlFor="name" className="text-sm">
                      Número
                    </label>
                    <input
                      {...register("number")}
                      id="number"
                      type="text"
                      placeholder="Nº"
                      className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                        errors.number
                          ? `focus:ring-red-500 border-red-500`
                          : `focus:ring-primary-500 border-gray-300`
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label htmlFor="name" className="text-sm">
                      Complemento
                    </label>
                    <input
                      {...register("complement")}
                      id="complement"
                      type="text"
                      placeholder="Complemento"
                      className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                        errors.complement
                          ? `focus:ring-red-500 border-red-500`
                          : `focus:ring-primary-500 border-gray-300`
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="name" className="text-sm">
                      Bairro *
                    </label>
                    <input
                      {...register("neighborhood")}
                      id="neighborhood"
                      type="text"
                      placeholder="Bairro"
                      className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                        errors.neighborhood
                          ? `focus:ring-red-500 border-red-500`
                          : `focus:ring-primary-500 border-gray-300`
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-4">
                    <label htmlFor="name" className="text-sm">
                      Cidade *
                    </label>
                    <input
                      {...register("city")}
                      id="city"
                      type="text"
                      placeholder="Cidade"
                      className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                        errors.city
                          ? `focus:ring-red-500 border-red-500`
                          : `focus:ring-primary-500 border-gray-300`
                      }`}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label htmlFor="name" className="text-sm">
                      UF *
                    </label>
                    <select
                      {...register("state")}
                      id="state"
                      className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                        errors.state
                          ? `focus:ring-red-500 border-red-500`
                          : `focus:ring-primary-500 border-gray-300`
                      }`}
                    >
                      <option value="">UF</option>
                      <option value={"AC"}>AC</option>
                      <option value={"AL"}>AL</option>
                      <option value={"AP"}>AP</option>
                      <option value={"AM"}>AM</option>
                      <option value={"BA"}>BA</option>
                      <option value={"CE"}>CE</option>
                      <option value={"DF"}>DF</option>
                      <option value={"ES"}>ES</option>
                      <option value={"GO"}>GO</option>
                      <option value={"MA"}>MA</option>
                      <option value={"MT"}>MT</option>
                      <option value={"MS"}>MS</option>
                      <option value={"MG"}>MG</option>
                      <option value={"PA"}>PA</option>
                      <option value={"PB"}>PB</option>
                      <option value={"PR"}>PR</option>
                      <option value={"PE"}>PE</option>
                      <option value={"PI"}>PI</option>
                      <option value={"RJ"}>RJ</option>
                      <option value={"RN"}>RN</option>
                      <option value={"RS"}>RS</option>
                      <option value={"RO"}>RO</option>
                      <option value={"RR"}>RR</option>
                      <option value={"SC"}>SC</option>
                      <option value={"SP"}>SP</option>
                      <option value={"SE"}>SE</option>
                      <option value={"TO"}>TO</option>
                    </select>
                  </div>
                  <div className="col-span-full flex justify-center">
                    <LoadingButton
                        styles="w-full md:w-64 px-2 py-2 text-sm text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-white"
                        type="submit"
                        text={createOffice ? `Cadastrar Escritório` : `Editar Escritório`}
                        loading={loading}
                      />
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
