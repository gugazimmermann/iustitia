import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface NoteInterface {
  id?: string;
  date?: string;
  title: string;
  content: string;
  tenantId?: string;
  ownerId?: string;
}

interface NoteNewModalProps {
  setShowModal(modal: boolean): void;
  action(note: NoteInterface): void;
  editNote?: NoteInterface;
}

const schema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
});

export function NoteNewModal({ setShowModal, action, editNote }: NoteNewModalProps) {
  const defaultValues: NoteInterface = {
    title: editNote?.title || "",
    content: editNote?.content || "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteInterface>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  async function onSubmit(dataFromForm: NoteInterface) {
    action(dataFromForm);
    setShowModal(false);
  }

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white sm:flex sm:items-start">
              <div className="h-full overflow-auto p-4 w-full flex flex-col ">
                <fieldset className="grid grid-cols-1 gap-4 p-4">
                  <div className="grid grid-cols-12 gap-4 col-span-full">
                    <div className="col-span-full">
                      <label htmlFor="title" className="text-sm">
                        Título *
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
                    <div className="col-span-full">
                      <label htmlFor="content" className="text-sm">
                        Conteúdo *
                      </label>
                      <TextareaAutosize
                        {...register("content")}
                        minRows={3}
                        id="content"
                        className={`w-full rounded-md focus:ring-0 focus:ring-opacity-75 text-gray-900 ${
                          errors.content
                            ? `focus:ring-red-500 border-red-500`
                            : `focus:ring-primary-500 border-gray-300`
                        }`}
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-white text-base font-medium sm:ml-3 sm:w-auto sm:text-sm bg-primary-500`}
              >
                {editNote?.id ? `Editar Nota` : `Salvar Nota` }
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

export default NoteNewModal;
