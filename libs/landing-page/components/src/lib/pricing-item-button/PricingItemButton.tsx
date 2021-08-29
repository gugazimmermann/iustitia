interface PricingItemButtonProps {
  link: string;
}

export function PricingItemButton({ link }: PricingItemButtonProps) {
  return (
    <div className="flex items-center justify-center">
      <button
      className="mx-auto lg:mx-0 hover:underline gradient2 text-gray-800 font-bold rounded my-6 py-4 px-8 shadow-lg"
      onClick={() => window.location.assign(link)}
      >
        Cadastrar
      </button>
    </div>
  );
}

export default PricingItemButton;
