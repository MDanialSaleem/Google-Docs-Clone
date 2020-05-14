import { AUTH_FAIL, AUTH_SUCCESS } from "../Actions/Types";

const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };

        case AUTH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        default:
            return state;
    }
};
