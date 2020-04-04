import React, {useState} from "react";
import { useSlate } from "slate-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import StyleConstants from "./EditorUtils/StyleConstants";
import Fonts from "./EditorUtils/Fonts";

const FontChanger = () => {
    const editor = useSlate();
    const [value, changeValue] = useState(Fonts.Arial);
    let active = CustomHelpers.isMarkActive(editor, StyleConstants.FONT, Fonts.Arial);
    console.log(active);
    if(active && active !== value){
        changeValue(active);
    }
    const handleChange = event => {
        changeValue(event.target.value);
        CustomHelpers.toggleMark(editor, StyleConstants.FONT, event.target.value);
    };
    return (
        <select value={value} onChange={handleChange}>
            <option value={Fonts.Arial}>Arial</option>
            <option value={Fonts.Monospace}>Monospace</option>
            <option value={Fonts.TimesNewRoman}>TimesNewRoman</option>
            <option value={Fonts.Impact}>Impact</option>
        </select>
    );
};


export default FontChanger;