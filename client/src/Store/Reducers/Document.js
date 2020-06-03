import { LOAD_DOCUMENTS, UPDATE_COUNT } from "../Actions/Types";

const initialState = {
    documents: [],
    count: 0,
    activePage: 1,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_DOCUMENTS:
            return {
                ...state,
                ...payload,
            };
        case UPDATE_COUNT:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
};
