import { combineReducers } from "redux";
import auth from "./Auth";
import alert from "./Alert";
import document from "./Document";

export default combineReducers({ auth, alert, document });
