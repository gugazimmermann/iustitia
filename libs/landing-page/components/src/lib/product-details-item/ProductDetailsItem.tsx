interface ProductDetailsItemProps {
  title: string;
  subTitle: string;
  text: string;
  link: string;
}

export function ProductDetailsItem({
  title,
  subTitle,
  text,
  link,
}: ProductDetailsItemProps) {
  return (
    <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
      <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
        <p className="w-full text-gray-600 text-xs md:text-sm px-6 mt-6">
          {title}
        </p>
        <div className="w-full font-bold text-xl text-gray-800 px-6">
          {subTitle}
        </div>
        <p className="text-gray-600 text-base px-6 mb-5">{text}</p>
      </div>
      <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
        <div className="flex items-center justify-center">
          <button
            className="mx-auto lg:mx-0 hover:underline gradient2 text-gray-800 font-extrabold rounded my-6 py-4 px-8 shadow-lg"
            onClick={() => window.location.assign(link)}
          >
            Testar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsItem;
