import React, { useCallback, useMemo, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import CustomElements from "./EditorUtils/CustomElements";
import initialValue from "./EditorUtils/InitialValue";
import EventHandlers from "./EditorUtils/EventHandlers";
import SubToolBar2 from "./SubToolbar2";
import EditorState from "./EditorContext/State";

const RichTextExample = () => {
    const [value, setValue] = useState(initialValue);
    const renderElement = useCallback(
        (props) => <CustomElements.Element {...props} />,
        []
    );
    const renderLeaf = useCallback(
        (props) => <CustomElements.Leaf {...props} />,
        []
    );
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={(value) => setValue(value)}
        >
            <EditorState>
                <SubToolBar2 />
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="A rich text editor"
                    spellCheck
                    autoFocus
                    onKeyDown={(event) => EventHandlers.keyDown(event, editor)}
                />
            </EditorState>
        </Slate>
    );
};

export default RichTextExample;
