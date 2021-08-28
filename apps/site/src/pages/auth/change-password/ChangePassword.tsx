import { Routes } from '../../../app/App';
import Title from '../../../components/auth/title/Title';
import AuthLink from '../../..//components/auth/auth-link/AuthLink';

export function ChangePassword() {
  return (
    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      <Title title="Mudar Senha" />

      <section className="mt-5">
        <form className="flex flex-col" method="POST" action="#">
          <div className="mb-6 rounded">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
              htmlFor="code"
            >
              Código
            </label>
            <input
              type="text"
              id="code"
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
              htmlFor="newpassword"
            >
              Nova Senha
            </label>
            <input
              type="password"
              id="newpassword"
              className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            />
          </div>
          <AuthLink link={Routes.SignIn} text="Voltar para Entrar" />
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}

export default ChangePassword;
