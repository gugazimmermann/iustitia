import { ChangeEvent, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import TextareaAutosize from "react-textarea-autosize";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getAddressFromCEP,
  getUserInitials,
  validateEmail,
} from "@iustitia/site/shared-utils";
import { LoadingButton, AvatarCropper } from "@iustitia/site/shared-components";
import {
  GetModule,
  ModulesEnum,
  ModulesInterface,
  GetRoutes,
  BCRoutesInterface,
} from "@iustitia/modules";
import { UploadCloudIcon } from "@iustitia/site/icons";
import {
  BusinessContactsServices,
  PlacesServices,
} from "@iustitia/site/services";

const BCModule = GetModule(ModulesEnum.businessContacts) as ModulesInterface;

type BCPersonsType = BusinessContactsServices.BCPersonsRes;
type BCCompaniesType = BusinessContactsServices.BCCompaniesRes;
type PlacesType = PlacesServices.PlacesRes;

export interface FormProps {
  loading: boolean;
  type: "Clientes" | "Contatos" | "Fornecedores" | undefined;
  data?: BCPersonsType;
  places?: PlacesType[];
  companies?: BCCompaniesType[];
  create?(data: FormData): void;
  update?(data: FormData): void;
}

const schema = yup.object({
  name: yup.string().required(),
  avatar: yup.mixed(),
  email: yup.string(),
  phone: yup.string(),
  zip: yup.string(),
  address: yup.string(),
  number: yup.string(),
  complement: yup.string(),
  neighborhood: yup.string(),
  city: yup.string(),
  state: yup.string(),
  position: yup.string(),
  companyId: yup.string(),
  comments: yup.string(),
  owner: yup.string(),
});

export function Form({
  loading,
  type,
  data,
  places,
  companies,
  create,
  update,
}: FormProps) {
  const defaultValues: BCPersonsType = {
    owner: "Personal",
    name: data?.name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    zip: data?.zip || "",
    address: data?.address || "",
    number: data?.number || "",
    complement: data?.complement || "",
    neighborhood: data?.neighborhood || "",
    city: data?.city || "",
    state: data?.state || "",
    position: data?.position || "",
    companyId: data?.companyId || "",
    comments: data?.comments || "",
  };
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const avatarRegister = register("avatar");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewName, setPreviewName] = useState(defaultValues.name);
  const [preview, setPreview] = useState<string | undefined>("");

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [blob, setBlob] = useState<Blob>();
  const [inputImg, setInputImg] = useState<string>();

  useEffect(() => {
    if (data?.name) {
      setValue("name", data?.name);
      setValue("email", data?.email);
      setValue("phone", data?.phone);
      setValue("zip", data?.zip);
      setValue("address", data?.address);
      setValue("number", data?.number);
      setValue("complement", data?.complement);
      setValue("neighborhood", data?.neighborhood);
      setValue("city", data?.city);
      setValue("state", data?.state);
      setValue("position", data?.position);
      setValue("companyId", data?.companyId);
      setValue("comments", data?.comments);
      if (data?.userId) setValue("owner", "Personal");
      if (data?.placeId) setValue("owner", data.placeId);
      if (!data?.userId && !data?.placeId) setValue("owner", "All");
    }
  }, [data, setValue]);

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

  useEffect(() => {
    const name = watch((value) => {
      if (!preview && value.name) setPreviewName(value.name);
    });
    return () => name.unsubscribe();
  }, [preview, watch]);

  useEffect(() => {
    if (data?.avatar)
      setPreview(`${process.env.NX_BUCKET_AVATAR_URL}${data?.avatar}`);
  }, [data?.avatar]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    const file = e.target.files[0];
    const allowedExtension = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedExtension.includes(file.type)) {
      setError("avatar", { message: "Somente arquivo JPG ou PNG" });
      return;
    }
    if (file.size > 1000000) {
      setError("avatar", { message: "Arquivo deve ter até 1 mega" });
      return;
    }
    clearErrors("avatar");
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setInputImg(reader.result as string);
        setShowAvatarModal(true);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const getBlob = (blob: Blob) => {
    const blobURL = URL.createObjectURL(blob);
    setPreview(blobURL);
    setBlob(blob);
  };

  async function onSubmit(dataFromForm: BCPersonsType) {
    if (dataFromForm.zip && !validZip) {
      setError("zip", { type: "manual" });
      return;
    }
    if (dataFromForm.email && !validateEmail(dataFromForm.email)) {
      setError("email", { type: "manual" });
      return;
    }
    const formData = new FormData();
    Object.entries(dataFromForm).forEach(([key, value]) => {
      if (key !== "avatar") {
        formData.append(key, value as string);
      } else {
        if (dataFromForm?.avatar?.length) {
          formData.append("avatar", dataFromForm.avatar[0]);
        }
      }
      formData.append("type", type as string);
    });
    if (create) {
      create(formData);
      return;
    }
    if (update) {
      if (!data?.id) {
        console.error("ID not found!");
        return;
      }
      formData.append("id", data.id as string);
      update(formData);
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-auto">
      <fieldset className="grid grid-cols-1 gap-4 p-4 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-4 col-span-full lg:col-span-4">
          <div className="col-span-full sm:col-span-4">
            <select
              {...register("owner")}
              id="owner"
              className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                errors.state
                  ? `focus:ring-red-500 border-red-500`
                  : `focus:ring-primary-500 border-gray-300`
              }`}
            >
              <option value={"All"}>Geral</option>
              <option value={"Personal"}>Pessoal</option>
              {places &&
                places.map((o, i) => (
                  <option key={i} value={o.id}>
                    {o.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-span-full sm:col-span-6"></div>
          <div className="col-span-full sm:col-span-5">
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
            <label htmlFor="email" className="text-sm">
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
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="phone" className="text-sm">
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
            <label htmlFor="zip" className="text-sm">
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
            <label htmlFor="address" className="text-sm">
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
            <label htmlFor="number" className="text-sm">
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
            <label htmlFor="complement" className="text-sm">
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
            <label htmlFor="neighborhood" className="text-sm">
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
            <label htmlFor="city" className="text-sm">
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
          <div className="col-span-full sm:col-span-2">
            <label htmlFor="state" className="text-sm">
              UF
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
          <div className="col-span-full sm:col-span-6">
            <label htmlFor="companyId" className="text-sm">
              Empresa
            </label>
            <select
              {...register("companyId")}
              id="company"
              className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900`}
            >
              <option value={""}></option>
              {companies &&
                companies.map((c, i) => (
                  <option key={i} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-span-full sm:col-span-6">
            <label htmlFor="position" className="text-sm">
              Cargo
            </label>
            <input
              {...register("position")}
              id="position"
              type="text"
              placeholder="Cargo"
              className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900`}
            />
          </div>
          <div className="col-span-full sm:col-span-12">
            <label htmlFor="comments" className="text-sm">
              Observações
            </label>
            <TextareaAutosize
              {...register("comments")}
              minRows={3}
              id="comments"
              className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900`}
            />
          </div>
          <div className="col-span-full flex flex-col items-center md:items-end">
            <label
              htmlFor="avatar"
              className="w-52 flex flex-col items-center px-1 py-2 bg-white rounded-md shadow-sm tracking-wide uppercase border border-blue cursor-pointer hover:bg-primary-300 hover:text-white text-primary-500 ease-linear transition-all duration-150"
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
                    {previewName ? getUserInitials(previewName) : "I"}
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
          {showAvatarModal && (
            <AvatarCropper
              setShow={setShowAvatarModal}
              getBlob={getBlob}
              inputImg={inputImg as string}
            />
          )}
          <div className="col-span-full flex justify-center">
            <LoadingButton
              styles="w-full md:w-64 px-2 py-2 text-sm text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-white"
              type="submit"
              text={
                create
                  ? `Cadastrar ${BCModule.singular}`
                  : `Editar ${BCModule.singular}`
              }
              loading={loading}
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
}

export default Form;
