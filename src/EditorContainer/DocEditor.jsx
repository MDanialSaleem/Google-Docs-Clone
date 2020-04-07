import React, { useCallback, useMemo, useState, useContext } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import CustomElements from "./EditorUtils/CustomElements";
import initialValue from "./EditorUtils/InitialValue";
import EventHandlers from "./EditorUtils/EventHandlers";
import SubToolBar2 from "./SubToolbar2";
import EditorContext from "./EditorContext/Context";
import CustomHelpers from "./EditorUtils/CustomHelpers";
import StyleConstants from "./EditorUtils/StyleConstants";

const DocEditor = () => {
    const [value, setValue] = useState(initialValue);
    const editorContext = useContext(EditorContext);

    const renderElement = useCallback(
        (props) => <CustomElements.Element {...props} />,
        []
    );
    const renderLeaf = useCallback(
        (props) => <CustomElements.Leaf {...props} />,
        []
    );
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

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
        }
    };

    const blurHandler = () => {
        editorContext.setSelection(editor.selection);
        editorContext.blur();
    };

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={(value) => setValue(value)}
        >
            <SubToolBar2 />
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="A rich text editor"
                spellCheck
                autoFocus
                onKeyDown={(event) => EventHandlers.keyDown(event, editor)}
                onBlur={blurHandler}
                onClick={onmousedownhandler}
            />
        </Slate>
    );
};

export default DocEditor;
