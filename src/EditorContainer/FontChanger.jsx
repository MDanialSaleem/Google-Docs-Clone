import React, {useState} from "react";
import { useSlate } from "slate-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import StyleConstants from "./EditorUtils/StyleConstants";
import Fonts from "./EditorUtils/Fonts";
import EditorContext from "./EditorContext/Context";


const FontChanger = () => {
    //const editor = useSlate();
    //let active = CustomHelpers.isMarkActive(editor, StyleConstants.FONT, Fonts.Arial);

    const editorContext = React.useContext(EditorContext);


    // if(active && active !== value){
    //     changeValue(active);
    // }
    const handleChange = event => {
        editorContext.setFont(event.target.value);
        //CustomHelpers.toggleMark(editor, StyleConstants.FONT, event.target.value);
    };
    return (
        <select value={editorContext[StyleConstants.FONT]} onChange={handleChange}>
            <option value={Fonts.Arial}>Arial</option>
            <option value={Fonts.Monospace}>Monospace</option>
            <option value={Fonts.TimesNewRoman}>TimesNewRoman</option>
            <option value={Fonts.Impact}>Impact</option>
        </select>
    );
};


export default FontChanger;