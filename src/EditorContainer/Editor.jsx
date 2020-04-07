/** @jsx jsx */
import { jsx } from "@emotion/core";
import Toolbar from "./Toolbar";
import DocEditor from "./DocEditor";
import { Row, Col } from "react-grid-system";
import EditorState from "./EditorContext/State";

const Editor = () => {
    const style = {
        marginTop: "50px",
    };
    return (
        <div>
            <Toolbar />
            <Row css={style} justify="center">
                <Col css={{ backgroundColor: "white" }} xs={10}>
                    <EditorState>
                        <DocEditor />
                    </EditorState>
                </Col>
            </Row>
        </div>
    );
};

export default Editor;
