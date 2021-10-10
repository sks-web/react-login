function userDataReducer(
  currentState = [
    { i: 1, j: 2 },
    { i: 3, j: 4 },
    {
      fullName: "SACHI KANTA SAHU",
      userName: "sahu.sachikanta02@gmail.com",
      password: "Sachikanta@02",
      confirmPassword: "Sachisahu@02",
    },
  ],
  action
) {
  switch (action.type) {
    case "SAVE":
      return [...currentState, action.userData];
    default:
      return currentState;
  }
}

export { userDataReducer };
