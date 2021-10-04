import "./App.css";

import Header from "./Components/Navigation/header/header";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <h1>Home Page!!!</h1>
      {tab === "login" && (
        <LoginContext.Provider value={userData}>
          <Login setAuthantication={setAuthantication} />
        </LoginContext.Provider>
      )}
      {tab === "register" && (
        <Registration addNewUserDetails={addNewUserDetails} />
      )} */}
    </div>
  );
}

export default App;
