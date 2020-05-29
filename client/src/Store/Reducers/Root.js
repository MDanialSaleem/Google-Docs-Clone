import { combineReducers } from "redux";
import auth from "./Auth";
import alert from "./Alert";

export default combineReducers({ auth, alert });
