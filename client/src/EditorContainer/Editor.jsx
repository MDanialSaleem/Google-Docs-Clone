/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
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

const Editor = (props) => {
    const style = {
        marginTop: "50px",
    };

    const [value, setValue] = useState(null);
    const [name, setName] = useState(null);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    useEffect(() => {
        // because effects cannot direcrlt use aync functions.
        const fetchDoc = async (id) => {
            try {
                const res = await axios.get("/api/documents/" + id);
                setName(res.data.name);
                setValue(res.data.content);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDoc(props.match.params.id);
    }, [value]);
    return value ? (
        <div>
            <EditorState>
                <Slate
                    editor={editor}
                    value={value}
                    onChange={(value) => setValue(value)}
                >
                    <Toolbar name={name} />
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
    ) : (
        <div>Loading</div>
    );
};

export default Editor;
