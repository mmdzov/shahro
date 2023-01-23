import { Redirect, Route } from "react-router";

const ConditionalRoute = ({ path, component: Component, exact, ...props }) => {
  return (
    <Route
      path={path}
      exact={exact || true}
      render={(props) => {
        const auth = localStorage.getItem("authID");
        const session = localStorage.getItem("sessionID");
        return auth !== null && session !== null ? (
          <Redirect from={path} to={"/"} />
        ) : (
          <Component {...props} />
        );
      }}
      {...props}
    />
  );
};

export default ConditionalRoute;
