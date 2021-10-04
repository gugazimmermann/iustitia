import { Route } from "react-router-dom";
import NotFound from "../NotFound";

export function NotFoundRoutes() {
  return (
    <Route path="*">
      <NotFound />
    </Route>
  );
}

export default NotFoundRoutes;
