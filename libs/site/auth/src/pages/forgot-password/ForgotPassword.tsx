import { SiteRoutes as Routes} from '@iustitia/react-routes'
import { Title, Link } from '../..';

export function ForgotPassword() {
  return (
    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      <Title
        title="Esqueceu a Senha?"
        subtitle="Digite seu email e receba o link de recuperação"
      />

      <section className="mt-5">
        <form className="flex flex-col" method="POST" action="#">
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
          <Link link={Routes.SignIn} text="Voltar para Entrar" />
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

export default ForgotPassword;
