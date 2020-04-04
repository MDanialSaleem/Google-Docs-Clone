import React, { useReducer } from "react";
import Context from "./Context";
import Reducer from "./Reducer";
import StyleConstants from "../EditorUtils/StyleConstants";
import Actions from "./Actions";

const EditorState = (props) => {
    const initialState = {
        [StyleConstants.FONT]: StyleConstants.FONT_VALUES.ARIAL,
        [StyleConstants.FONT_SIZE]: 10,
        focused: true,
    };

    const [state, dispatch] = useReducer(Reducer, initialState);

    const functions = {
        setFont: (newFont) => {
            dispatch({
                type: Actions.SET_FONT,
                data: newFont,
            });
        },
        setFontSize: (newSize) => {
            dispatch({
                type: Actions.SET_FONT_SIZE,
                data: newSize,
            });
        },
        focus: () => dispatch({ type: Actions.FOCUS }),
        blur: () => dispatch({ type: Actions.BLUR }),
    };

    return (
        <Context.Provider
            value={{
                ...state,
                ...functions,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default EditorState;
