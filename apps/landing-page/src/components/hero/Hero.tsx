import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="gradient w-full h-screen">
      <div className="container mx-auto">
        <div className="text-center px-3 lg:px-0">
          <h1 className="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight">
            Mensagem para vender o Produto!
          </h1>
          <p className="leading-normal text-gray-800 text-base md:text-xl lg:text-2xl mb-8">
            Um paragrafo maior para deixar o visitante com vontade de assinar!
          </p>

          <button className="gradient2 mx-auto lg:mx-0 hover:underline text-gray-800 font-extrabold rounded my-2 md:my-6 py-4 px-8 shadow-lg w-48">
            Cadastrar
          </button>
        </div>

        <div className="flex items-center w-full mx-auto content-end">
          <div className="browser-mockup flex flex-1 m-6 md:px-0 md:m-12 bg-white w-1/2 rounded shadow-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
