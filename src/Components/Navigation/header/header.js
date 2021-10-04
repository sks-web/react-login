import { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "../../Home/home";
import Contact from "../../Contact/contact";
import AboutUs from "../../AboutUs/aboutus";
import Login from "../../Login/login";
import Register from "../../Register/register";

function Header() {
  console.log(window.location.pathname);
  const [menuItem, setMenuItem] = useState(window.location.pathname);
  const handleActiveItemClick = (e, { name }) => {
    setMenuItem(name);
  };
  const redirectPage = function (data) {
    setMenuItem(data);
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
          <Link to="/contact">
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
          <Register redirectPage={redirectPage} />{" "}
        </Route>
      </Switch>
    </Router>
  );
}

export default Header;
