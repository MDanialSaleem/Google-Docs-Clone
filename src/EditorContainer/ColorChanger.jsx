import React from "react";
import { useSlate } from "slate-react";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import { Modal, Button, Icon, Message } from "semantic-ui-react";
import { SwatchesPicker, GithubPicker } from "react-color";
import StyleConstants from "./EditorUtils/StyleConstants";
import EditorContext from "./EditorContext/Context";
import { Transforms, Text } from "slate";
import PropTypes from "prop-types";
import { Row, Col, Visible, Hidden } from "react-grid-system";

const CC = (props) => {
    const editor = useSlate();
    const editorContext = React.useContext(EditorContext);
    const type = props.foreground
        ? StyleConstants.TEXT_COLOR
        : StyleConstants.BACKGROUND_COLOR;

    let active = CustomHelpers.isMarkActive(editor, type);

    if (editorContext.focused && active && active !== editorContext[type]) {
        props.foreground
            ? editorContext.setColor(active)
            : editorContext.setBackgroundColor(active);
    }

    const onClickHandler = (color, event) => {
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
    const margins = {
        marginBottom: "20px",
    };

    return (
        <>
            <Col style={margins}>
                <h4>
                    {props.foreground
                        ? "Pick Text Color"
                        : "Pick Background Color"}
                </h4>
                <Hidden xs>
                    <SwatchesPicker onChange={onClickHandler} />
                </Hidden>
                <Visible xs>
                    <GithubPicker onChange={onClickHandler} />
                </Visible>
            </Col>
        </>
    );
};

CC.propTypes = {
    foreground: PropTypes.bool.isRequired,
};

const ColorChanger = () => {
    const editor = useSlate();
    const text = CustomHelpers.isMarkActive(editor, StyleConstants.TEXT_COLOR);
    const background = CustomHelpers.isMarkActive(
        editor,
        StyleConstants.BACKGROUND_COLOR
    );
    const iconStyles = {
        color: text,
        backgroundColor: background,
    };

    return (
        <Modal
            dimmer="blurring"
            trigger={
                <Icon link circular style={iconStyles} name="paint brush" />
            }
            closeIcon
            position="bottom center"
            hoverable
        >
            <Modal.Content>
                <Row justify="around">
                    <CC foreground={true} />
                    <CC foreground={false} />
                </Row>
            </Modal.Content>
        </Modal>
    );
};

export default ColorChanger;
