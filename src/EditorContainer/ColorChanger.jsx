import React from "react";
import { useSlate } from "slate-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import { Popup, Button } from "semantic-ui-react";
import { CirclePicker } from "react-color";
import StyleConstants from "./EditorUtils/StyleConstants";
import EditorContext from "./EditorContext/Context";
import { Transforms, Text } from "slate";

const ColorChanger = () => {
    const editor = useSlate();
    const editorContext = React.useContext(EditorContext);

    let active = CustomHelpers.isBlockActive(editor, StyleConstants.TEXT_COLOR);

    if (
        editorContext.focused &&
        active &&
        active !== editorContext[StyleConstants.TEXT_COLOR]
    ) {
        editorContext.setColor(active);
    }

    const onClickHandler = (color, event) => {
        event.preventDefault();
        if (!editorContext.selection) {
            return;
        }
        editorContext.setColor(color.hex);
        if (
            editorContext.selection.anchor.offset ===
            editorContext.selection.focus.offset
        ) {
            CustomHelpers.toggleMark(
                editor,
                StyleConstants.TEXT_COLOR,
                color.hex
            );
        } else {
            console.log(editorContext.selection);
            Transforms.setNodes(
                editor,
                { [StyleConstants.TEXT_COLOR]: color.hex },
                {
                    at: editorContext.selection,
                    match: (node) => Text.isText(node),
                    split: true
                }
            );
        }
    };

    return (
        <Popup trigger={<Button>C</Button>} position="bottom center" hoverable>
            <Popup.Header>Pick Text Color</Popup.Header>
            <Popup.Content>
                <CirclePicker onChangeComplete={onClickHandler} />
            </Popup.Content>
        </Popup>
    );
};

export default ColorChanger;
