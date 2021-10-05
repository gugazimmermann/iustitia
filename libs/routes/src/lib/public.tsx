import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import {
  GetRoutes,
  ModulesEnum,
  DashboardsRoutesInterface,
} from "@iustitia/modules";
import { AuthServices } from "@iustitia/site/services";

type UserType = AuthServices.UserRes;

const routes = GetRoutes(ModulesEnum.dashboards) as DashboardsRoutesInterface;

export function PublicRoute({ children, ...rest }: RouteProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as AuthServices.UserRes);

  useEffect(() => {
    if (AuthServices.getUser()) {
      currentUser();
    } else {
      setLoading(false);
    }
  }, []);

  async function currentUser() {
    try {
      const currentUser = (await AuthServices.getMe()) as UserType;
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
