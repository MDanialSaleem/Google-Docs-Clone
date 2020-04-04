import React, {useState} from "react";
import {useSlate} from "slate-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import StyleConstants from "./EditorUtils/StyleConstants";

const FontSizeChanger = () => {
    const editor = useSlate();
    const [value, changeValue] = useState(15);

    const handleChange = event => {
        changeValue(event.target.value);
        CustomHelpers.toggleMark(editor, StyleConstants.FONT_SIZE, event.target.value);
    };

    return (
        <input
            type="number"
            defaultValue={value}
            min="1"
            onKeyUp={handleChange}
            onChange={handleChange}
        />
    );
};

export default FontSizeChanger;