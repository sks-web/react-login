import { useEffect, useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "../../Home/home";
import Contact from "../../Contact/contact";
import AboutUs from "../../AboutUs/aboutus";
import Login from "../../Login/login";
import Register from "../../Register/register";
import Dashboard from "../../Dashboard/dashboard";
import PrivateRoute from "../../PrivateRoute/privateRoute";

function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const [menuItem, setMenuItem] = useState(window.location.pathname);
  const handleActiveItemClick = (e, { name }) => {
    if (name === "/logout") {
      setIsAuth(false);
      window.history.pushState(null, "login");
      setMenuItem("/login");
    }
    setMenuItem(name);
  };

  return (
    <Router>
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
          {!isAuth ? (
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
          <Login setIsAuth={setIsAuth} updateDashbaord={setMenuItem} />{" "}
        </Route>
        <Route path="/register">
          {" "}
          <Register updateMenu={setMenuItem} />{" "}
        </Route>
        <PrivateRoute path="/dashboard" isAuth={isAuth} redirect={setMenuItem}>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default Header;
