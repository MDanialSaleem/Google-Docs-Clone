import React, { useReducer } from "react";
import Context from "./Context";
import Reducer from "./Reducer";
import Fonts from "../EditorUtils/Fonts";
import StyleConstants from "../EditorUtils/StyleConstants";
import Actions from "./Actions";

const EditorState = (props) => {
    const initialState = {
        [StyleConstants.FONT]: Fonts.Arial,
    };

    const [state, dispatch] = useReducer(Reducer, initialState);

    const setFont = (newFont) => {
        dispatch({
            type: Actions.SET_FONT,
            data: newFont,
        });
    };

    return (
        <Context.Provider
            value={{
                ...state,
                setFont,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};


export default EditorState;