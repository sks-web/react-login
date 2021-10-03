import "./App.css";
import { useState } from "react";

import Header from "./Components/Navigation/header/header";
// import Footer from "./Components/Navigation/footer";
import Login from "./Components/login/login";
import Registration from "./Components/registration/registration";
import LoginContext from "./Components/context/context";

function App() {
  const d = [
    {
      fullName: "Test1 Sahu",
      userName: "test1@gmail.com",
      password: "Testsahu@01",
    },
    {
      fullName: "Test2 Sahu",
      userName: "test2@gmail.com",
      password: "Testsahu@02",
    },
    {
      fullName: "Test3 Sahu",
      userName: "test3@gmail.com",
      password: "Testsahu@03",
    },
  ];
  const [tab, setTab] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(d);

  const clickTab = function (data) {
    setTab(data);
  };

  const setAuthantication = function (auth) {
    setIsAuth(auth);
  };

  const doLogout = function (e) {
    setIsAuth(e);
  };

  const addNewUserDetails = function (data, t) {
    console.log("Inside App");
    const d = userData;
    d.push(data);
    setTab(t);
    setUserData(d);
    console.log(d);
  };
  return (
    <div className="App">
      <Header
        tabEvent={clickTab}
        isAuth={isAuth}
        presentTab={tab}
        doLogout={doLogout}
      />
      <h1>Landing Page!!!</h1>
      {tab === "login" && !isAuth && (
        <LoginContext.Provider value={userData}>
          <Login setAuthantication={setAuthantication} />
        </LoginContext.Provider>
      )}
      {tab === "register" && !isAuth && (
        <Registration addNewUserDetails={addNewUserDetails} />
      )}
    </div>
  );
}

export default App;
