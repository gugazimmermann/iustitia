import { useHistory } from "react-router-dom";

export interface AddButtonProps {
  back: boolean;
  route: string | undefined;
  reload(): void;
  isProfessional?: boolean;
}

export function AddButton({ back, route, reload, isProfessional }: AddButtonProps) {
  const history = useHistory();

  return (
    <button
      onClick={() => {
        if (back) {
          if (route) {
            history.push(route);
          } else {
            reload();
          }
        } else {
          history.push(`${route}/add`);
        }
      }}
      className={`px-4 py-2 text-sm text-white rounded-md ${
        back
          ? `bg-secondary-500 hover:bg-secondary-700 `
          : isProfessional
          ? `bg-primary-500 hover:bg-primary-900 focus:ring-primary-500`
          : `bg-gray-300 `
      }`}
      disabled={!isProfessional}
    >
      {back ? "Listagem" : "Adicionar"}
    </button>
  );
}
export default AddButton;
