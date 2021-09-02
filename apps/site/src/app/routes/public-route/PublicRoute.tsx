import { Redirect, Route, RouteProps } from "react-router-dom";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import { seeAuth } from "../see-auth";

export function PublicRoute({ children, ...rest }: RouteProps) {
  return (
    <Route
      {...rest}
      render={() => {
        return seeAuth() ? <Redirect to={Routes.Dashboard} /> : children;
      }}
    />
  );
}

export default PublicRoute;
