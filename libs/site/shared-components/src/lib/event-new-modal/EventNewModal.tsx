import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import {
  SeeEventBackgroundColor,
  SeeEventTextColor,
} from "@iustitia/site/shared-utils";
import { ColorPaletteIcon, CalendarIcon } from "@iustitia/site/icons";
import { ColorPicker, CalendarDayInput, AvatarModalContent } from "../..";
import { MembersServices } from "@iustitia/site/services";

interface EventInterface {
  id?: string;
  title?: string;
  color?: string;
  startDay?: string;
  startTimeHours?: string;
  startTimeMin?: string;
  endDay?: string;
  endTime?: string;
  endTimeHours?: string;
  endTimeMin?: string;
  fullDay: boolean;
  description?: string;
  tenantId?: string;
}

type MembersSimpleType = MembersServices.MembersSimpleRes;

interface EventNewModalProps {
  day?: DateTime;
  contacts: MembersSimpleType[];
  setShowModal(modal: boolean): void;
  action(event: EventInterface): void;
}

export function EventNewModal({
  day,
  contacts,
  setShowModal,
  action,
}: EventNewModalProps) {
  const defaultValues: EventInterface = {
    title: "",
    startDay: day?.toFormat("dd 'de' MMMM 'de' yyyy"),
    startTimeHours: "08",
    startTimeMin: "00",
    endTimeHours: "09",
    endTimeMin: "00",
    fullDay: false,
  };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EventInterface>({
    defaultValues,
  });
  const [showStartDayModal, setShowStartDayModal] = useState(false);
  const [selectedStartDay, setSelectedStartDay] = useState<DateTime>(
    day as DateTime
  );
  const [showEndDayModal, setShowEndDayModal] = useState(false);
  const [selectedEndDay, setSelectedEndDay] = useState<DateTime>(
    day as DateTime
  );
  const [showColorModal, setShowColorModal] = useState(false);
  const [color, setColor] = useState("blue-500");

  const [currentList, setCurrentList] = useState<MembersSimpleType[]>([])

  useEffect(() => {
    setValue("startDay", selectedStartDay.toFormat("dd 'de' MMMM 'de' yyyy"));
    setValue("endDay", selectedStartDay.toFormat("dd 'de' MMMM 'de' yyyy"));
    setShowStartDayModal(false);
  }, [selectedStartDay]);

  useEffect(() => {
    setValue("endDay", selectedEndDay.toFormat("dd 'de' MMMM 'de' yyyy"));
    setShowEndDayModal(false);
  }, [selectedEndDay]);

  function handleSelectUser(user: MembersSimpleType) {
    let usersList = currentList.slice(0);
    if (usersList.some((u) => u.id === user.id))
      usersList = usersList.filter((u) => u.id !== user.id);
    else usersList.push(user);
    setCurrentList(usersList);
  }

  async function onSubmit(dataFromForm: EventInterface) {
    action(dataFromForm);
    setShowModal(false);
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      <div className="inline-block align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mx-auto"
          >
            <fieldset className="grid grid-cols-1 gap-4 p-4 text-left">
              <div className="grid grid-cols-12 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-11">
                  <label htmlFor="title">Título</label>
                  <input
                    {...register("title")}
                    id="title"
                    type="text"
                    className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                      errors.title
                        ? `focus:ring-red-500 border-red-500`
                        : `focus:ring-primary-500 border-gray-300`
                    }`}
                  />
                </div>

                <div className="relative col-span-full sm:col-span-1">
                  <button
                    type="button"
                    className={`flex mt-6 -ml-2 cursor-pointer rounded-full h-10 w-10 ${SeeEventBackgroundColor(
                      color
                    )} ${SeeEventTextColor(color)}`}
                    onClick={() => setShowColorModal(true)}
                  >
                    <ColorPaletteIcon
                      styles={`h-6 w-6 mx-auto my-auto ${SeeEventBackgroundColor(
                        color
                      )}`}
                      stroke={2}
                    />
                  </button>
                  {showColorModal && (
                    <ColorPicker
                      setColor={setColor}
                      open={showColorModal}
                      setOpen={setShowColorModal}
                    />
                  )}
                </div>

                <div className="col-span-full sm:col-span-8 relative">
                  <label htmlFor="startDay">Início</label>
                  <input
                    {...register("startDay")}
                    id="startDay"
                    type="text"
                    onFocus={() => setShowStartDayModal(true)}
                    className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                      errors.startDay
                        ? `focus:ring-red-500 border-red-500`
                        : `focus:ring-primary-500 border-gray-300`
                    }`}
                  />
                  <div className="absolute top-8 right-2">
                    <CalendarIcon styles="h-6 w-6 text-gray-500" />
                  </div>
                  {showStartDayModal && (
                    <CalendarDayInput
                      start={DateTime.fromFormat("01/01/1900", "dd/MM/yyyy")}
                      day={selectedStartDay}
                      action={setSelectedStartDay}
                      open={showStartDayModal}
                      setOpen={setShowStartDayModal}
                    />
                  )}
                </div>

                <div className="col-span-full sm:col-span-4">
                  <div className="border border-gray-300 rounded-md sm:mt-6">
                    <div className="flex bg-transparent items-center justify-center">
                      <select
                        {...register("startTimeHours")}
                        id="startTimeHours"
                        name="startTimeHours"
                        className="text-sm border-transparent bg-transparent"
                      >
                        {[...Array(24).keys()].map((h) => (
                          <option key={h} value={h < 10 ? `0${h}` : h}>
                            {h < 10 ? `0${h}` : h}
                          </option>
                        ))}
                      </select>
                      <span className="text-xl">:</span>
                      <select
                        {...register("startTimeMin")}
                        id="startTimeMin"
                        name="startTimeMin"
                        className="text-sm border-0"
                      >
                        {["00", "15", "30", "45"].map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-span-full sm:col-span-8 relative">
                  <label htmlFor="endDay">Final</label>
                  <input
                    {...register("endDay")}
                    id="endDay"
                    type="text"
                    onFocus={() => setShowEndDayModal(true)}
                    className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                      errors.endDay
                        ? `focus:ring-red-500 border-red-500`
                        : `focus:ring-primary-500 border-gray-300`
                    }`}
                  />
                  <div className="absolute top-8 right-2">
                    <CalendarIcon styles="h-6 w-6 text-gray-500" />
                  </div>
                  {showEndDayModal && (
                    <CalendarDayInput
                      start={DateTime.fromFormat(
                        getValues("startDay") as string,
                        "dd 'de' MMMM 'de' yyyy"
                      )}
                      day={selectedEndDay}
                      action={setSelectedEndDay}
                      open={showEndDayModal}
                      setOpen={setShowEndDayModal}
                    />
                  )}
                </div>

                <div className="col-span-full sm:col-span-4">
                  <div className="border border-gray-300 rounded-md sm:mt-6">
                    <div className="flex bg-transparent items-center justify-center">
                      <select
                        {...register("endTimeHours")}
                        id="endTimeHours"
                        name="endTimeHours"
                        className="text-sm border-transparent bg-transparent"
                      >
                        {[...Array(24).keys()].map((h) => (
                          <option key={h} value={h < 10 ? `0${h}` : h}>
                            {h < 10 ? `0${h}` : h}
                          </option>
                        ))}
                      </select>
                      <span className="text-xl">:</span>
                      <select
                        {...register("endTimeMin")}
                        id="endTimeMin"
                        name="endTimeMin"
                        className="text-sm border-0"
                      >
                        {["00", "15", "30", "45"].map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-span-full text-right">
                  <label htmlFor="fullDay">Dia Inteiro </label>
                  <input
                    {...register("fullDay")}
                    id="fullDay"
                    type="checkbox"
                    className="h-5 w-5 text-primary-500"
                  />
                </div>

                <div className="col-span-full">
                  <label htmlFor="description">Descrição</label>
                  <TextareaAutosize
                    {...register("description")}
                    minRows={2}
                    maxRows={5}
                    className="w-full rounded-md focus:ring-0 focus:ring-opacity-75 focus:ring-primary-500 border-gray-300"
                  />
                </div>
              </div>
            </fieldset>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-white text-base font-medium sm:ml-3 sm:w-auto sm:text-sm bg-primary-500`}
              >
                Salvar Evento
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventNewModal;
