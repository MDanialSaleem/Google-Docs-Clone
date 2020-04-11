import Actions from "./Actions";
import StyleConstants from "../EditorUtils/StyleConstants";

export default (state, action) => {
    switch (action.type) {
        case Actions.SET_FONT:
            return {
                ...state,
                [StyleConstants.FONT]: action.data,
            };
        case Actions.SET_FONT_SIZE:
            return {
                ...state,
                [StyleConstants.FONT_SIZE]: action.data,
            };
        case Actions.SET_COLOR:
            return {
                ...state,
                [StyleConstants.TEXT_COLOR]: action.data,
            };
        case Actions.SET_BG_COLOR:
            return {
                ...state,
                [StyleConstants.BACKGROUND_COLOR]: action.data,
            };
        case Actions.FOCUS:
            return {
                ...state,
                focused: true,
            };
        case Actions.BLUR:
            return {
                ...state,
                focused: false,
            };
        case Actions.SET_SELECTION:
            return {
                ...state,
                selection: action.data,
            };
        default:
    }
};
