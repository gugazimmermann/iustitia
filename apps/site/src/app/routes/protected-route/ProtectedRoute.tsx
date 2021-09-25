import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { AuthService } from "@iustitia/site/services";

export function ProtectedRoute({ children, ...rest }: RouteProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as AuthService.UserInterface);

  useEffect(() => {
    if (AuthService.getUser()) {
      currentUser();
    } else {
      setLoading(false);
    }
  }, []);

  async function currentUser() {
    try {
      const currentUser = await AuthService.getMe();
      setUser(currentUser);
      setLoading(false);
    } catch (err) {
      AuthService.logout();
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <div>
      {loading ? null : user.email ? (
        <Route {...rest} render={() => children} />
      ) : (
        <Redirect to={Routes.SignIn} />
      )}
    </div>
  );
}

export default ProtectedRoute;
