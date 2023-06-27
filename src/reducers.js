import { combineReducers } from "redux";
import AppReducer from "./reducers/AppReducer";
import UserReducer from "./reducers/UserReducer";

const Reducers = combineReducers({
  user: UserReducer,
  app: AppReducer,
});

export default Reducers;
