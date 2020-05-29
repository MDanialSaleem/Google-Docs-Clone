import { SET_ALERT, REMOVE_ALERT } from "../Actions/Types";
const initialState = [];

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload.id);
        default:
            return state;
    }
};
