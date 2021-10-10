import { Menu, Segment } from "semantic-ui-react";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Home from "../../Home/home";
import Contact from "../../Contact/contact";
import AboutUs from "../../AboutUs/aboutus";
import Login from "../../Login/login";
import Register from "../../Register/register";
import Dashboard from "../../Dashboard/dashboard";
import PrivateRoute from "../../PrivateRoute/privateRoute";

function Header() {
  const menuItem = useSelector((state) => state.navTab.currentTab);
  const userAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const handleActiveItemClick = (e, { name }) => {
    if (name === "/logout") {
      dispatch({ type: "LOGGEDOUT" });
      dispatch({ type: "CHANGE_TAB", val: name });
    }
    dispatch({ type: "CHANGE_TAB", val: name });
  };

  return (
    <>
      <Segment inverted>
        <Menu inverted secondary>
          <Link to="/">
            <Menu.Item
              name="/"
              active={menuItem === "/"}
              onClick={handleActiveItemClick}
            >
              Home
            </Menu.Item>
          </Link>
          <Link exact to="/contact">
            <Menu.Item
              name="/contact"
              active={menuItem === "/contact"}
              onClick={handleActiveItemClick}
            >
              Contact
            </Menu.Item>
          </Link>
          <Link to="/aboutus">
            <Menu.Item
              name="/aboutus"
              active={menuItem === "/aboutus"}
              onClick={handleActiveItemClick}
            >
              About Us
            </Menu.Item>
          </Link>
          <Link to="/dashboard">
            <Menu.Item
              name="/dashboard"
              active={menuItem === "/dashboard"}
              onClick={handleActiveItemClick}
            >
              Private Dashboard
            </Menu.Item>
          </Link>
          {!userAuth ? (
            <Menu.Menu position="right">
              <Link to="/login">
                <Menu.Item
                  name="/login"
                  active={menuItem === "/login"}
                  onClick={handleActiveItemClick}
                >
                  Login
                </Menu.Item>
              </Link>
              <Link to="/register">
                <Menu.Item
                  name="/register"
                  active={menuItem === "/register"}
                  onClick={handleActiveItemClick}
                >
                  Register
                </Menu.Item>
              </Link>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item
                name="/logout"
                active={menuItem === "/logout"}
                onClick={handleActiveItemClick}
              >
                Logout
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </Segment>

      <Switch>
        <Route exact path="/">
          {" "}
          <Home />{" "}
        </Route>
        <Route path="/contact">
          {" "}
          <Contact />{" "}
        </Route>
        <Route path="/aboutus">
          {" "}
          <AboutUs />{" "}
        </Route>
        <Route path="/login">
          {" "}
          <Login />{" "}
        </Route>
        <Route path="/register">
          {" "}
          <Register />{" "}
        </Route>
        <PrivateRoute path="/dashboard" isAuth={userAuth}>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default Header;
