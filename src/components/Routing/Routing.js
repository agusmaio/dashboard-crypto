import { Switch, Route, Redirect } from "react-router";
import { routes } from "constants/routes";
import Welcome from "components/Welcome";
import Home from "components/Home";

const Routing = () => {
  return (
    <Switch>
      <Route exact path={routes.base}>
        <Redirect to={routes.welcome} />
      </Route>

      <Route exact path={routes.welcome}>
        <Welcome />
      </Route>

      <Route exact path={routes.home}>
        <Home />
      </Route>
    </Switch>
  );
};

export default Routing;
