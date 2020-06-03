import { LOAD_DOCUMENTS } from "../Actions/Types";

const initialState = {
    owndocs: [],
    colabdocs: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_DOCUMENTS:
            return {
                ...state,
                owndocs: payload.owndocs,
                colabdocs: payload.colabdocs,
            };
        default:
            return state;
    }
};
