import { useLocation, useHistory } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { logout } from "@iustitia/site/auth";
import "./Dashboard.css";

/* eslint-disable-next-line */
export interface DashboardProps {}

interface State {
  username: string;
  email: string;
  tenant: string;
  createdAt: string;
  updatedAt: string;
}

export function Dashboard(props: DashboardProps) {
  const history = useHistory();
  const location = useLocation();
  const state = location.state as State;

  const handleLogout = async () => {
    await logout();
    history.push(Routes.SignIn);
  };

  return (
    <div>
      <h1>{JSON.stringify(state, undefined, 2)}</h1>
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={handleLogout}
      >
        Sair
      </button>
    </div>
  );
}

export default Dashboard;
