import { useHistory } from "react-router-dom";

interface PricingItemButtonProps {
  link: string;
  plan: string;
}

export function PricingItemButton({ link, plan }: PricingItemButtonProps) {
  const history = useHistory();

  return (
    <div className="flex items-center justify-center">
      <button
      className="mx-auto lg:mx-0 hover:underline gradient2 text-gray-800 font-bold rounded my-6 py-4 px-8 shadow-lg"
      onClick={() => history.push({
        pathname: link,
        state: { plan }
      })}
      >
        Cadastrar
      </button>
    </div>
  );
}

export default PricingItemButton;
