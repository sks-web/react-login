const initialValue = { isAuth: false, authUser: {} };

const authReducer = (currentState = initialValue, action) => {
  console.log("[authReducer]", action);
  switch (action.type) {
    case "LOGGEDIN":
      return {
        ...action.user,
      };
    case "LOGGEDOUT":
      return {
        ...initialValue,
      };
    default:
      return currentState;
  }
};

export { authReducer };
