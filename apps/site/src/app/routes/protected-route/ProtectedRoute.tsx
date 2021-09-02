import { Redirect, Route, RouteProps } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { seeAuth } from "../see-auth";

export function ProtectedRoute({ children, ...rest }: RouteProps) {
  return (
    <Route
      {...rest}
      render={() => {
        return !seeAuth() ? <Redirect to={Routes.SignIn} /> : children;
      }}
    />
  );
}

export default ProtectedRoute;
