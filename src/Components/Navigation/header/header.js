import { useEffect, useState } from "react";
import { Menu, Segment } from "semantic-ui-react";

function Header(props) {
  const [menuItem, setMenuItem] = useState(props.presentTab);
  const handleActiveItemClick = (e, { name }) => {
    setMenuItem(name);
    if (props.doLogout) {
      return props.doLogout(false);
    }
    return props.tabEvent(name);
  };
  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item
          name="home"
          active={menuItem === "home"}
          onClick={handleActiveItemClick}
        >
          Home
        </Menu.Item>
        <Menu.Item
          name="contact"
          active={menuItem === "contact"}
          onClick={handleActiveItemClick}
        >
          Contact
        </Menu.Item>
        <Menu.Item
          name="aboutus"
          active={menuItem === "aboutus"}
          onClick={handleActiveItemClick}
        >
          About Us
        </Menu.Item>
        {!props.isAuth && (
          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={menuItem === "login"}
              onClick={handleActiveItemClick}
            >
              Login
            </Menu.Item>
            <Menu.Item
              name="register"
              active={menuItem === "register"}
              onClick={handleActiveItemClick}
            >
              Register
            </Menu.Item>
          </Menu.Menu>
        )}
        {props.isAuth && (
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={menuItem === "logout"}
              onClick={handleActiveItemClick}
            >
              Logout
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    </Segment>
  );
}

export default Header;
