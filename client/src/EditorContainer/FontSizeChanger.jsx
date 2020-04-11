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
    let active = CustomHelpers.isMarkActive(editor, StyleConstants.FONT_SIZE);

    if (
        editorContext.focused &&
        active &&
        active !== editorContext[StyleConstants.FONT_SIZE]
    ) {
        editorContext.setFontSize(active);
    }
    const handleChange = (event) => {
        editorContext.setFontSize(event.target.value);
        CustomHelpers.toggleMark(
            editor,
            StyleConstants.FONT_SIZE,
            event.target.value
        );
    };

    return (
        <select
            value={editorContext[StyleConstants.FONT_SIZE]}
            onChange={handleChange}
        >
            {StyleConstants.FONT_SIZE_VALUES.map((val) => (
                <option
                    value={val}
                    key={val}
                    css={{
                        fontSize: val,
                    }}
                >
                    {val}
                </option>
            ))}
        </select>
    );
};

export default FontChanger;
