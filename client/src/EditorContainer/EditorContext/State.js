import React, { useReducer } from "react";
import Context from "./Context";
import Reducer from "./Reducer";
import StyleConstants from "../EditorUtils/StyleConstants";
import Actions from "./Actions";

const EditorState = (props) => {
    const initialState = {
        [StyleConstants.FONT]: StyleConstants.FONT_VALUES.ARIAL,
        [StyleConstants.FONT_SIZE]: 10,
        [StyleConstants.TEXT_COLOR]: "#000000",
        [StyleConstants.BACKGROUND_COLOR]: "#FFFFFF",
        focused: true,
        selection: null,
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
        setColor: (newColor) => {
            dispatch({
                type: Actions.SET_COLOR,
                data: newColor,
            });
        },
        setSelection: (newSelection) => {
            dispatch({
                type: Actions.SET_SELECTION,
                data: newSelection,
            });
        },
        setBackgroundColor: (newColor) => {
            dispatch({
                type: Actions.SET_BG_COLOR,
                data: newColor,
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
