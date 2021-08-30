import { Link as RouterLink } from 'react-router-dom';
import { SiteRoutes as Routes} from '@iustitia/react-routes'
import { Title, Link } from '../..';

export function SignIn() {
  return (
    <>
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <Title title="Entre em seu escritório" />
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
              <Link link={Routes.ForgotPassword} text="Esqueceu sua senha?" />
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
            >
              Entrar
            </button>
          </form>
        </section>
      </main>

      <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className="text-white">
          Não tem uma conta?{' '}
          <RouterLink to={Routes.SignUp}>
            <span className="font-bold hover:underline">Cadastrar</span>.
          </RouterLink>
        </p>
      </div>
    </>
  );
}

export default SignIn;
