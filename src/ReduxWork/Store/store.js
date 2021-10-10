import { combineReducers, createStore } from "redux";

// Import Reducers
import { navReducer } from "../Reducers/navReducer";
import { authReducer } from "../Reducers/authReducer";
import { userDataReducer } from "../Reducers/userDataReducer";

const reducers = combineReducers({
  navTab: navReducer,
  auth: authReducer,
  userDatabase: userDataReducer,
});

const store = createStore(reducers);

export { store };
