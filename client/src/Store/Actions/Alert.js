import { SET_ALERT, REMOVE_ALERT } from "./Types";
import { v4 as uuidv4 } from "uuid";

// true is used for success. false is used for failure. the reason
// that these are encapsualted here as action creators and not dispatched directly by the
// the UI is that we may need to add more types of messages in furure in whcih
// case the internal representaion may change and hence it wil be easier to
// make changes at one place.

const setAlert = (type, message) => ({
    type: SET_ALERT,
    payload: {
        id: uuidv4(),
        type,
        message,
    },
});

export const successAlert = (message) => setAlert(true, message);
export const errorAlert = (message) => setAlert(false, message);
export const removeAlert = (id) => ({
    type: REMOVE_ALERT,
    payload: {
        id,
    },
});
