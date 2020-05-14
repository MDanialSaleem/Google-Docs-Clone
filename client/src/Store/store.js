//pure redux thing, nothing to do with react.
import { createStore, applyMiddleware } from "redux";
//smth to do with redux devtools in the browser. needs more elaboration.
import { composeWithDevTools } from "redux-devtools-extension";
//for async stuff. write more on this later.
import thunk from "redux-thunk";
import rootReducer from "./Reducers/Root";

const initialState = {}; //empty because our state lives in the separate reducers.

const middlewares = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
