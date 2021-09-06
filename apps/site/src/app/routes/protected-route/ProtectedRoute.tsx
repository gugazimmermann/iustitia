import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { getUser, getCurrentUser, ICurrentUser, logout } from "@iustitia/site/auth";

export function ProtectedRoute({ children, ...rest }: RouteProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as ICurrentUser);

  useEffect(() => {
    if (getUser()) {
      currentUser();
    } else {
      setLoading(false);
    }
  }, []);

  async function currentUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    } catch (err) {
      logout();
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
