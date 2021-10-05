import { Route, Redirect } from "react-router";

export default function PrivateRoute({ children, redirect, isAuth, ...rest }) {
  console.log(isAuth);
  if (!isAuth) {
    redirect("/login");
  }
  return (
    <Route
      {...rest}
      render={({ location }) => (isAuth ? children : <Redirect to="/login" />)}
    />
  );
}
