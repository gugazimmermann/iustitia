import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SeeEventBackgroundColor,
  SeeEventTextColor,
} from "@iustitia/site/shared-utils";
import { ColorPaletteIcon, CalendarIcon } from "@iustitia/site/icons";
import { ColorPicker, CalendarDayInput } from "../..";

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

interface EventNewModalProps {
  day?: DateTime;
  setShowModal(modal: boolean): void;
  action(event: EventInterface): void;
}

const schema = yup.object().shape({
  title: yup.string().required(),
});

export function EventNewModal({
  setShowModal,
  action,
  day,
}: EventNewModalProps) {
  const defaultValues: EventInterface = {
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
    resolver: yupResolver(schema),
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

  useEffect(() => {
    setValue("startDay", selectedStartDay.toFormat("dd 'de' MMMM 'de' yyyy"));
    setValue("endDay", selectedStartDay.toFormat("dd 'de' MMMM 'de' yyyy"));
    setShowStartDayModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStartDay]);

  useEffect(() => {
    setValue("endDay", selectedEndDay.toFormat("dd 'de' MMMM 'de' yyyy"));
    setShowEndDayModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEndDay]);

  async function onSubmit(dataFromForm: EventInterface) {
    action(dataFromForm);
    setShowModal(false);
  }

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mx-auto"
          >
            <fieldset className="grid grid-cols-1 gap-4 p-4">
              <div className="grid grid-cols-12 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-11">
                  <label htmlFor="title" className="text-sm">
                    Título
                  </label>
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
                  <label htmlFor="startDay" className="text-sm">
                    Início
                  </label>
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
                  <label htmlFor="endDay" className="text-sm">
                    Final
                  </label>
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

                <div className="col-span-full">
                  <input
                    {...register("fullDay")}
                    id="fullDay"
                    type="checkbox"
                    className="h-5 w-5 text-primary-500"
                  />
                  <label htmlFor="fullDay" className="ml-2 text-sm">
                    Dia Inteiro
                  </label>
                </div>

                <div className="col-span-full">
                  <label htmlFor="description" className="text-sm">
                    Descrição
                  </label>
                  <TextareaAutosize
                    {...register("description")}
                    minRows={2}
                    maxRows={5}
                    className="w-full rounded-md focus:ring-0 focus:ring-opacity-75 focus:ring-primary-500 border-gray-300"
                  />
                </div>

                <div className="col-span-full">
                  <div className="w-64">
                    <div className="mt-1 relative">
                      <button
                        type="button"
                        className="relative w-full bg-white rounded-md shadow-lg pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <span className="flex items-center">
                          <img
                            src="/images/person/2.jpeg"
                            alt="person"
                            className="flex-shrink-0 h-6 w-6 rounded-full"
                          />
                          <span className="ml-3 block truncate">
                            John Jackson
                          </span>
                        </span>
                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </button>
                      <div className="absolute mt-1 w-full z-10 rounded-md bg-white shadow-lg">
                        <ul
                          tabIndex={-1}
                          role="listbox"
                          aria-labelledby="listbox-label"
                          aria-activedescendant="listbox-item-3"
                          className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                        >
                          <li
                            id="listbox-item-0"
                            className="text-gray-900 cursor-default hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9"
                          >
                            <div className="flex items-center">
                              <img
                                src="/images/person/1.jpg"
                                alt="person"
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />
                              <span className="ml-3 block font-normal truncate">
                                Mick Poulaz
                              </span>
                            </div>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </li>
                          <li
                            id="listbox-item-1"
                            className="text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white relative py-2 pl-3 pr-9"
                          >
                            <div className="flex items-center">
                              <img
                                src="/images/person/1.jpg"
                                alt="person"
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />
                              <span className="ml-3 block font-normal truncate">
                                Julien Schiano
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-white text-base font-medium sm:ml-3 sm:w-auto sm:text-sm bg-primary-500`}
              >
                {/* {editNote?.id ? `Editar Nota` : `Salvar Nota` } */}
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
