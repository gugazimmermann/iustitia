import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthServices } from "@iustitia/site/services";
import { AuthRoutesInterface, GetRoutes, ModulesEnum } from "@iustitia/modules";

type UserType = AuthServices.UserRes;

const auth = GetRoutes(ModulesEnum.auth) as AuthRoutesInterface;

export function ProtectedRoute({ children, ...rest }: RouteProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as UserType);

  useEffect(() => {
    currentUser();
  }, []);

  async function currentUser() {
    try {
      const currentUser = (await AuthServices.getMe()) as UserType;
      setUser(currentUser);
      setLoading(false);
    } catch (err) {
      AuthServices.logout();
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? null : user.email ? (
        <Route {...rest} render={() => children} />
      ) : (
        <Redirect to={auth.signIn} />
      )}
    </div>
  );
}

export default ProtectedRoute;
