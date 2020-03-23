import React from "react";
import Toolbar from "./Toolbar";
import DocEditor from "./DocEditor";
import {Row, Col} from "react-grid-system";

const Editor = () => (
    <>
        <Toolbar />
        <Row justify="center">
            <Col style={{backgroundColor:"lightgrey"}}  xs={10}>
                <DocEditor />
            </Col>
        </Row>
    </>
);


export default Editor;