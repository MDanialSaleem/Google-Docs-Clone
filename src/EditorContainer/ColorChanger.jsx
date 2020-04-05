import React from "react";
import { useSlate } from "slate-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import { Popup, Button } from "semantic-ui-react";
import { SwatchesPicker } from "react-color";
import StyleConstants from "./EditorUtils/StyleConstants";
import EditorContext from "./EditorContext/Context";
import { Transforms, Text } from "slate";
import PropTypes from "prop-types";

const ColorChanger = (props) => {
    const editor = useSlate();
    const editorContext = React.useContext(EditorContext);
    const type = props.foreground
        ? StyleConstants.TEXT_COLOR
        : StyleConstants.BACKGROUND_COLOR;

    let active = CustomHelpers.isBlockActive(editor, type);

    if (editorContext.focused && active && active !== editorContext[type]) {
        props.foreground
            ? editorContext.setColor(active)
            : editorContext.setBackgroundColor(active);
    }

    const onClickHandler = (color, event) => {
        event.preventDefault();
        if (!editorContext.selection) {
            return;
        }
        props.foreground
            ? editorContext.setColor(color.hex)
            : editorContext.setBackgroundColor(color.hex);

        if (
            editorContext.selection.anchor.offset ===
            editorContext.selection.focus.offset
        ) {
            CustomHelpers.toggleMark(editor, type, color.hex);
        } else {
            Transforms.setNodes(
                editor,
                {
                    [type]: color.hex,
                },
                {
                    at: editorContext.selection,
                    match: (node) => Text.isText(node),
                    split: true,
                }
            );
        }
    };

    return (
        <Popup trigger={<Button>C</Button>} position="bottom center" hoverable>
            <Popup.Header>
                {props.foreground ? "Pick Text Color" : "Pick Background Color"}
            </Popup.Header>
            <Popup.Content>
                <SwatchesPicker onChangeComplete={onClickHandler} />
            </Popup.Content>
        </Popup>
    );
};

ColorChanger.propTypes = {
    foreground: PropTypes.bool.isRequired,
};

export default ColorChanger;
