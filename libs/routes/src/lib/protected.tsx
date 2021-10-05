import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthServices } from "@iustitia/site/services";
import { AuthRoutesInterface, GetRoutes, ModulesEnum } from "@iustitia/modules";

type UserType = AuthServices.UserRes;

const routes = GetRoutes(ModulesEnum.dashboards) as AuthRoutesInterface;

export function ProtectedRoute({ children, ...rest }: RouteProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as UserType);

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
      {loading ? null : user.email ? (
        <Route {...rest} render={() => children} />
      ) : (
        <Redirect to={routes.signIn} />
      )}
    </div>
  );
}

export default ProtectedRoute;
