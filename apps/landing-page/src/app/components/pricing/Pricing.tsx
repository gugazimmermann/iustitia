import { Routes } from '../../App';
import PricingItem from './PricingItem';

export function Pricing() {
  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
        <h2 className="w-full my-2 text-5xl font-black leading-tight text-center text-gray-800">
          Planos
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
          <PricingItem
            title="Gratuito"
            functionalities={['Thing', 'Thing', 'Thing']}
            price={0}
            priceText="teste por 7 dias"
            link={Routes.SignUp}
            active={false}
          />
          <PricingItem
            title="Básico"
            functionalities={['Thing', 'Thing', 'Thing']}
            price={25}
            priceText="/ por usuário"
            link={Routes.SignUp}
            active={true}
          />
          <PricingItem
            title="Profissional"
            functionalities={['Thing', 'Thing', 'Thing']}
            price={99}
            priceText="usuários ilimitados"
            link={Routes.SignUp}
            active={false}
          />
        </div>
      </div>
    </section>
  );
}

export default Pricing;
