import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthServices } from "@iustitia/site/services";
import { AuthRoutesInterface, UserInterface } from "@iustitia/interfaces";
import { GetComponentRoutes, ComponentsEnum } from "@iustitia/components";

const routes = GetComponentRoutes(ComponentsEnum.dashboards) as AuthRoutesInterface;

export function ProtectedRoute({ children, ...rest }: RouteProps) {
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
      {loading ? null : user.email ? (
        <Route {...rest} render={() => children} />
      ) : (
        <Redirect to={routes.signIn} />
      )}
    </div>
  );
}

export default ProtectedRoute;
