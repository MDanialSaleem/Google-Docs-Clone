import React from "react";
import {useSlate} from "slate-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import { Popup, Button } from "semantic-ui-react";
import { CirclePicker } from 'react-color';
import StyleConstants from "./EditorUtils/StyleConstants";

const ColorChanger = () => {
    const editor = useSlate();

    const onClickHandler = (color, event) => {
        event.preventDefault();
        CustomHelpers.toggleMark(editor, StyleConstants.TEXT_COLOR, color.hex);
    };

    return (
        <Popup trigger={<Button>C</Button>} position="bottom center" hoverable>
            <Popup.Header>Pick Text Color</Popup.Header>
            <Popup.Content>
                <CirclePicker onChangeComplete={ onClickHandler } />
            </Popup.Content>
        </Popup>
    );
};


export default ColorChanger;