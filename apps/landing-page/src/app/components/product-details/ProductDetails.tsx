import ProductDetailsItem from "./ProductDetailsItem";

// TODO: make it like a Carousel
export function ProductDetails() {
  const appSite = process.env.NX_APP_SITE || '';

  return (
    <section className="bg-white border-b py-8">
      <div className="container mx-auto flex flex-wrap pt-4 pb-12">
        <h2 className="w-full my-2 text-5xl font-black leading-tight text-center text-gray-800">
          Módulos
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <ProductDetailsItem
          title="Agenda"
          subTitle="Lorem ipsum dolor sit amet."
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula"
          link={`${appSite}/cadastrar`}
        />
        <ProductDetailsItem
          title="Calendário"
          subTitle="Lorem ipsum dolor sit amet."
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula"
          link={`${appSite}/cadastrar`}
        />
        <ProductDetailsItem
          title="Processos"
          subTitle="Lorem ipsum dolor sit amet."
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula"
          link={`${appSite}/cadastrar`}
        />
      </div>
    </section>
  );
}

export default ProductDetails;
