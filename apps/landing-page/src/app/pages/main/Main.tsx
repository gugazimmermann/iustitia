import Hero from '../../components/hero/Hero';
import Customers from '../../components/customers/Customers';
import ProductMain from '../../components/product-main/ProductMain';
import ProductDetails from '../../components/product-details/ProductDetails';
import Pricing from '../../components/pricing/Pricing';
import Action from '../../components/action/Action';

export function Main() {
  return (
    <>
      <Hero />
      <Customers />
      <ProductMain />
      <ProductDetails />
      <Pricing />
      <Action />
    </>
  );
}

export default Main;
