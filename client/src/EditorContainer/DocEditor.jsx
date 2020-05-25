import React, { useCallback, useContext } from "react";
import { Editable, useSlate } from "slate-react";
import CustomElements from "./EditorUtils/CustomElements";
import EventHandlers from "./EditorUtils/EventHandlers";
import EditorContext from "./EditorContext/Context";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import StyleConstants from "./EditorUtils/StyleConstants";

const DocEditor = (props) => {
    const editorContext = useContext(EditorContext);
    const editor = useSlate();

    const renderElement = useCallback(
        (props) => <CustomElements.Element {...props} />,
        []
    );
    const renderLeaf = useCallback(
        (props) => <CustomElements.Leaf {...props} />,
        []
    );
    const onmousedownhandler = () => {
        if (!editorContext.focused) {
            editorContext.focus();
            CustomHelpers.toggleMark(
                editor,
                StyleConstants.FONT,
                editorContext[StyleConstants.FONT]
            );
            CustomHelpers.toggleMark(
                editor,
                StyleConstants.FONT_SIZE,
                editorContext[StyleConstants.FONT_SIZE]
            );
            CustomHelpers.toggleMark(
                editor,
                StyleConstants.TEXT_COLOR,
                editorContext[StyleConstants.TEXT_COLOR]
            );
            CustomHelpers.toggleMark(
                editor,
                StyleConstants.BACKGROUND_COLOR,
                editorContext[StyleConstants.BACKGROUND_COLOR]
            );
        }
    };

    const blurHandler = () => {
        editorContext.setSelection(editor.selection);
        editorContext.blur();
    };

    console.log(editorContext.editable);
    return (
        <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="A rich text editor"
            spellCheck
            autoFocus
            onKeyDown={(event) => EventHandlers.keyDown(event, editor)}
            onBlur={blurHandler}
            onClick={onmousedownhandler}
            style={{ minHeight: "500px", backgroundColor: "white" }}
            readOnly={!editorContext.editable}
        />
    );
};

export default DocEditor;
