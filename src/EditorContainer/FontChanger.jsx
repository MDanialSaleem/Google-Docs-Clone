/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { useSlate } from "slate-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import StyleConstants from "./EditorUtils/StyleConstants";
import EditorContext from "./EditorContext/Context";


const FontChanger = () => {
    const editor = useSlate();
    const editorContext = React.useContext(EditorContext);
    let active = CustomHelpers.isMarkActive(editor, StyleConstants.FONT);


    if(editorContext.focused && active && active !== editorContext[StyleConstants.FONT]){
        editorContext.setFont(active);
    }
    const handleChange = event => {
        editorContext.setFont(event.target.value);
        CustomHelpers.toggleMark(editor, StyleConstants.FONT, event.target.value);
    };

    return (
        <select value={editorContext[StyleConstants.FONT]} onChange={handleChange}>
            {
                Object.keys(StyleConstants.FONT_VALUES).map(key => (
                    <option 
                    value={StyleConstants.FONT_VALUES[key]} 
                    key={StyleConstants.FONT_VALUES[key]}
                    css={{
                        fontFamily: StyleConstants.FONT_VALUES[key]
                    }}
                    >
                        {StyleConstants.FONT_VALUES[key]}
                    </option>
                ))
            }
        </select>
    );
};

export default FontChanger;