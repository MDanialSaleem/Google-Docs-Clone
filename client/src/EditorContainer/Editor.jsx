/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useMemo } from "react";
import Toolbar from "./Toolbar";
import DocEditor from "./DocEditor";
import { Row, Col } from "react-grid-system";
import EditorFooter from "./EditorFooter";
import EditorState from "./EditorContext/State";
import initialValue from "./EditorUtils/InitialValue";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";
import SubToolBar2 from "./SubToolbar2";

const Editor = () => {
    const style = {
        marginTop: "50px",
    };

    const [value, setValue] = useState(initialValue);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <div>
            <EditorState>
                <Slate
                    editor={editor}
                    value={value}
                    onChange={(value) => setValue(value)}
                >
                    <Toolbar />
                    <Row css={style} justify="center">
                        <Col xs={10}>
                            <SubToolBar2 />
                            <DocEditor />
                        </Col>
                    </Row>
                    <EditorFooter />
                </Slate>
            </EditorState>
        </div>
    );
};

export default Editor;
