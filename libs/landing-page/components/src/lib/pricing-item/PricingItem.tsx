import { PricingItemButton } from "../..";

interface PricingProps {
  title: string;
  functionalities: string[];
  price: number;
  priceText: string;
  link: string;
  active: boolean;
}

export function PricingItem({
  title,
  functionalities,
  price,
  priceText,
  link,
  active,
}: PricingProps) {
  if (!active) {
    return (
      <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
        <div className="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
          <div className="p-8 text-3xl font-bold text-center border-b-4">
            {title}
          </div>
          <ul className="w-full text-center text-sm">
            {functionalities.map((f, i) => (
              <li key={i} className="border-b py-4">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
          <div className="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
            ${price} <span className="text-base">{priceText}</span>
          </div>
          <PricingItemButton link={link} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 gradient shadow hover:shadow-lg z-10">
        <div className="flex-1 rounded-t rounded-b-none overflow-hidden">
          <div className="w-full p-8 text-3xl font-bold text-center">
            {title}
          </div>
          <ul className="w-full text-center text-base font-bold">
            {functionalities.map((f, i) => (
              <li key={i} className="py-4">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-none mt-auto rounded-b rounded-t-none overflow-hidden p-6">
          <div className="w-full pt-6 text-4xl font-bold text-center">
            ${price} <span className="text-base">{priceText}</span>
          </div>
        </div>
        <PricingItemButton link={link} />
      </div>
    );
  }
}

export default PricingItem;
