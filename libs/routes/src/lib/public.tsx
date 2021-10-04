import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { DashboardsRoutesInterface, UserInterface } from "@iustitia/interfaces";
import {GetComponentRoutes, ComponentsEnum} from "@iustitia/components";
import { AuthServices } from "@iustitia/site/services";

const routes = GetComponentRoutes(ComponentsEnum.dashboards) as DashboardsRoutesInterface;

export function PublicRoute({ children, ...rest }: RouteProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as UserInterface);

  useEffect(() => {
    if (AuthServices.getUser()) {
      currentUser();
    } else {
      setLoading(false);
    }
  }, []);

  async function currentUser() {
    try {
      const currentUser = (await AuthServices.getMe()) as UserInterface;
      setUser(currentUser);
      setLoading(false);
    } catch (err) {
      AuthServices.logout();
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <div>
      {loading ? null : !user.email ? (
        <Route {...rest} render={() => children} />
      ) : (
        <Redirect to={routes.dashboards} />
      )}
    </div>
  );
}
