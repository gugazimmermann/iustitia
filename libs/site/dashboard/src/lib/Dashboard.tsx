import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { getCurrentUser, logout } from "@iustitia/site/auth";
import "./Dashboard.css";

/* eslint-disable-next-line */
export interface DashboardProps {}

interface Me {
  username: string;
  email: string;
  tenant: string;
  createdAt: string;
  updatedAt: string;
}

export function Dashboard(props: DashboardProps) {
  const history = useHistory();
  const [me, setMe] = useState({} as Me);

  useEffect(() => {
    getMe();

    async function getMe() {
      try {
        const res = await getCurrentUser();
        setMe(res);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    history.push(Routes.SignIn);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{JSON.stringify(me, undefined, 2)}</h2>
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
