const initialValue = { currentTab: window.location.pathname };

function navReducer(currentState = initialValue, action) {
  console.log("[navReducer]", action);
  switch (action.type) {
    case "CHANGE_TAB":
      return {
        ...currentState,
        currentTab: action.val,
      };
    default:
      return initialValue;
  }
}

export { navReducer };
