import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAddressFromCEP, getUserInitials } from "@iustitia/site/shared-utils";
import { Me } from "../..";
import Header from "../../components/dashboard/header/Header";
import { UploadCloudIcon } from "../../icons";
import { setProfile } from "../../services";

interface ProfileProps {
  me?: Me;
  setMe?(me: Me): void;
}

type IFormValues = {
  name: string;
  email: string;
  phone: string;
  zip: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  avatar: FileList;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  zip: yup.string().required().min(10).max(10),
  address: yup.string().required(),
  neighborhood: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  avatar: yup
    .mixed()
    .test("fileSize", "Arquivo é muito grande", (value) => {
      return value && value[0].size <= 2000000;
    })
    .test("type", "Somente Imagens são permitidas", (value) => {
      const allowedExtension = ["image/jpeg", "image/jpg", "image/png"];
      return value && allowedExtension.includes(value[0].type);
    }),
});

export function Profile({ me, setMe }: ProfileProps) {
  const defaultValues = {
    name: me?.username || "",
    email: me?.email || "",
    phone: "",
    zip: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const avatarRegister = register("avatar");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string | undefined>("");

  async function fetchCEP(zip: string) {
    try {
      const data = await getAddressFromCEP(zip);
      if (data) {
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
      console.log(err);
      setError("zip", { type: "manual" });
      setValue("address", "");
      setValue("neighborhood", "");
      setValue("city", "");
      setValue("state", "");
    }
  }

  useEffect(() => {
    if (!selectedFile) {
      setPreview(me?.avatar);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [me?.avatar, selectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  async function onSubmit(data: IFormValues) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "avatar") {
        formData.append(key, value as string);
      } else {
        formData.append("avatar", data.avatar[0]);
      }
    });

    try {
      const res = await setProfile(formData);
      console.log("onSubmit res", res)
    }catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header before={[]} main="Perfil" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-auto">
        <fieldset className="grid grid-cols-1 gap-4 p-6">
          <div className="grid grid-cols-12 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-4">
              <label htmlFor="name" className="text-sm">
                Nome
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
                CEP
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
                Endereço
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
            <div className="col-span-full sm:col-span-4">
              <label htmlFor="name" className="text-sm">
                Bairro
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
                Cidade
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
            <div className="col-span-full sm:col-span-1">
              <label htmlFor="name" className="text-sm">
                Estado
              </label>
              <input
                {...register("state")}
                id="state"
                type="text"
                placeholder="Estado"
                className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                  errors.state
                    ? `focus:ring-red-500 border-red-500`
                    : `focus:ring-primary-500 border-gray-300`
                }`}
              />
            </div>
            <div className="col-span-full flex flex-col items-center md:items-end">
              <label
                htmlFor="avatar"
                className="w-52 flex flex-col items-center px-1 py-2 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-primary-300 hover:text-white text-primary-500 ease-linear transition-all duration-150"
              >
                <div className="flex items-center space-x-4">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full flex justify-center items-center text-center font-bold text-2xl text-primary-500 bg-primary-50 hover:text-primary-900 hover:bg-primary-100 focus:outline-none focus:bg-primary-100 focus:ring-primary-900">
                      {getUserInitials(me?.username)}
                    </div>
                  )}
                  <UploadCloudIcon styles="w-8 h-8" />
                  <span className="mt-2 text-base leading-normal">Foto</span>
                  <input
                    {...avatarRegister}
                    id="avatar"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      onSelectFile(e);
                      avatarRegister.onChange(e);
                    }}
                  />
                </div>
              </label>
              {errors.avatar && (
                <p className="text-red-500">{errors.avatar.message}</p>
              )}
            </div>
            <div className="col-span-full flex justify-center">
              <button
                type="submit"
                className="w-full md:w-64 px-4 py-4 text-sm text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-white"
              >
                Alterar Cadastro
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default Profile;
