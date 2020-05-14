import axios from "axios";
import setAuthToken from "../../Utils/SetAuthToken";
import { AUTH_FAIL, AUTH_SUCCESS } from "./Types";

// LOAD USER
export const loadUser = () => async (dispatch) => {
    setAuthToken();

    try {
        const res = await axios.get("/api/users/");
        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_FAIL,
        });
    }
};
