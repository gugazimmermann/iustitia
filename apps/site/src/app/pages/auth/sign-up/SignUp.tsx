import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Title from '../../../components/auth/title/Title';

interface useParamsProps {
  planParam: string;
}

export function SignUp() {
  const { planParam } = useParams<useParamsProps>();
  const [plan, setPlan] = useState('');

  useEffect(() => {
    switch (planParam) {
      case 'gratuito':
        setPlan('Gratuito');
        break;
      case 'basico':
        setPlan('Básico');
        break;
      case 'profissional':
        setPlan('Profissional');
        break;
      default:
        setPlan('Gratuito');
    }
  }, [planParam]);

  return (
    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      <Title
        title="Cadastro"
        subtitle="Faça seu cadastro no plano"
        plan={plan}
      />
      <section className="mt-5">
        <form className="flex flex-col" method="POST" action="#">
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="nome"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            />
          </div>
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            />
          </div>
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            />
          </div>
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="repeatPassword"
            >
              Repita a Senha
            </label>
            <input
              type="password"
              id="repeatPassword"
              className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            />
          </div>
          <div className="flex justify-end">
            <Link to="/entrar">
              <div className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">
                Voltar para Entrar
              </div>
            </Link>
          </div>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignUp;
