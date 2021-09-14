import { WarningIcon } from "@iustitia/site/shared-components";
import { warningTypes, WARNING_TYPES } from "@iustitia/site/shared-utils";

export interface ConfirmationModalProps {
  setConfirm(confirm: boolean): void;
  type?: WARNING_TYPES;
  title: string;
  content: string;
  action(): void;
}

export function ConfirmationModal({
  setConfirm,
  type,
  title,
  content,
  action,
}: ConfirmationModalProps) {
  const { text, bg } = warningTypes(type ? type : WARNING_TYPES.NONE);
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${bg} bg-opacity-25 sm:mx-0 sm:h-10 sm:w-10`}
              >
                <WarningIcon styles={`h-8 w-8 ${text}`} />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{content}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => {
                action();
                setConfirm(false);
              }}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${bg} text-white text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
            >
              Sim, desejo excluir
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirm(false);
              }}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
